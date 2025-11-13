'use client'

import React from 'react'
import { Box, Snackbar, Alert } from '@mui/material'
import { styled } from '@mui/material/styles'
import Desktop from './components/Desktop'
import Taskbar from './components/Taskbar'
import Window from './components/Window'
import { Bounds, OpenWindowOptions, WindowState, type DisplaySettings } from './types'
import { getIconPaths, type IconMap } from './iconPaths'

const Root = styled(Box)({
    position: 'fixed',
    inset: 0,
    overflow: 'hidden',
    backgroundColor: '#008080', // Win98 teal fallback under wallpaper
    fontFamily: 'Tahoma, Verdana, Segoe UI, Arial, sans-serif',
})

const TaskbarHeight = 36
const LS_KEY = 'bk_win98_windows_v1'
const LS_SETTINGS = 'bk_win98_settings_v1'

export default function Win98App() {
    const [windows, setWindows] = React.useState<WindowState[]>([])
    const [zCounter, setZCounter] = React.useState(1)
    const [toast, setToast] = React.useState<string | null>(null)
    const [viewport, setViewport] = React.useState({ w: 0, h: 0 })
    const [settings, setSettings] = React.useState<DisplaySettings>({ wallpaperUrl: null, wallpaperMode: 'tile', iconPreset: 'win2k' })
    const icons: IconMap = React.useMemo(() => getIconPaths(settings.iconPreset || 'win2k'), [settings.iconPreset])

    // restore
    React.useEffect(() => {
        try {
            const raw = localStorage.getItem(LS_KEY)
            if (raw) {
                const parsed = JSON.parse(raw) as WindowState[]
                setWindows(parsed)
                const maxZ = parsed.reduce((m, w) => Math.max(m, w.z), 1)
                setZCounter(maxZ + 1)
            }
            const sraw = localStorage.getItem(LS_SETTINGS)
            if (sraw) setSettings(JSON.parse(sraw))
        } catch {}
    }, [])

    // persist
    React.useEffect(() => {
        try {
            localStorage.setItem(LS_KEY, JSON.stringify(windows))
        } catch {}
    }, [windows])

    React.useEffect(() => {
        try {
            localStorage.setItem(LS_SETTINGS, JSON.stringify(settings))
        } catch {}
    }, [settings])

    // Listen for settings applied from DisplaySettingsWin
    React.useEffect(() => {
        const handler = (e: Event) => {
            const ce = e as CustomEvent<{ wallpaperUrl: string | null; wallpaperMode: 'tile' | 'stretch' | 'center' }>
            if (!ce.detail) return
            setSettings(ce.detail)
            setToast('Wallpaper updated')
        }
        window.addEventListener('bk-apply-settings', handler as EventListener)
        return () => window.removeEventListener('bk-apply-settings', handler as EventListener)
    }, [])

    // viewport size
    React.useEffect(() => {
        const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight - TaskbarHeight })
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    const clampBounds = (b: Bounds): Bounds => {
        const minW = 280
        const minH = 160
        const w = Math.max(minW, Math.min(b.width, viewport.w))
        const h = Math.max(minH, Math.min(b.height, viewport.h))
        const x = Math.max(0, Math.min(b.x, Math.max(0, viewport.w - w)))
        const y = Math.max(0, Math.min(b.y, Math.max(0, viewport.h - h)))
        return { x, y, width: w, height: h }
    }

    // Open if not present; otherwise restore and focus existing by kind+optional title
    const openOrFocus = (kind: WindowState['kind'], title: string | null, create: () => OpenWindowOptions) => {
        const existing = windows.find((w) => w.kind === kind && (title ? w.title === title : true))
        if (existing) {
            setWindows((ws) => {
                const zTop = zCounter
                setZCounter(zTop + 1)
                return ws.map((w) => (w.id === existing.id ? { ...w, minimized: false, z: zTop } : w))
            })
            return
        }
        openWindow(create())
    }

    const bringToFront = (id: string) => {
        setWindows((ws) => {
            const zTop = zCounter
            setZCounter(zTop + 1)
            return ws.map((w) => (w.id === id ? { ...w, z: zTop } : w))
        })
    }

    const openWindow = (opts: OpenWindowOptions) => {
        // De-duplicate AIM chat windows by title
        if (opts.kind === 'aim_chat' && opts.title) {
            const existing = windows.find((w) => w.kind === 'aim_chat' && w.title === opts.title)
            if (existing) {
                setWindows((ws) => {
                    const zTop = zCounter
                    setZCounter(zTop + 1)
                    return ws.map((w) => (w.id === existing.id ? { ...w, minimized: false, z: zTop } : w))
                })
                return
            }
        }
        const id = `${opts.kind}-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`
        const defaultBounds: Bounds = {
            x: 80 + Math.random() * 100,
            y: 80 + Math.random() * 60,
            width: 640,
            height: 480,
        }
        const w: WindowState = {
            id,
            kind: opts.kind,
            title: opts.title,
            icon: opts.icon,
            bounds: clampBounds((opts.bounds as Bounds) || defaultBounds),
            minimized: false,
            maximized: false,
            z: zCounter,
            payload: opts.payload,
        }
        setZCounter(zCounter + 1)
        setWindows((ws) => [...ws, w])
    }

    const closeWindow = (id: string) => setWindows((ws) => ws.filter((w) => w.id !== id))

    const minimizeWindow = (id: string) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: true } : w)))

    const restoreWindow = (id: string) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: false, maximized: false } : w)))

    const toggleMaximize = (id: string) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)))

    const moveWindow = (id: string, dx: number, dy: number) => {
        setWindows((ws) =>
            ws.map((w) =>
                w.id === id
                    ? {
                          ...w,
                          bounds: clampBounds({ ...w.bounds, x: w.bounds.x + dx, y: w.bounds.y + dy }),
                      }
                    : w
            )
        )
    }

    const resizeWindow = (id: string, next: Partial<Bounds>) => setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, bounds: clampBounds({ ...w.bounds, ...next } as Bounds) } : w)))

    const openIE = () =>
        openOrFocus('ie', 'Microsoft Internet Explorer', () => ({
            kind: 'ie',
            title: 'Microsoft Internet Explorer',
            icon: icons.ie,
            bounds: { x: 60, y: 60, width: 960, height: 640 },
        }))
    const openReadme = () => openOrFocus('notepad', 'Bela Kiss Readme.txt', () => ({ kind: 'notepad', title: 'Bela Kiss Readme.txt', icon: icons.notepad }))
    const openPhotos = () => openOrFocus('explorer', 'Photos', () => ({ kind: 'explorer', title: 'Photos', icon: icons.folder }))
    const openRecycle = () => openOrFocus('recycle', 'Recycle Bin', () => ({ kind: 'recycle', title: 'Recycle Bin', icon: icons.recycle }))
    const openAIM = () =>
        openOrFocus('aim', 'AIM Buddy List', () => ({
            kind: 'aim',
            title: 'AIM Buddy List',
            icon: icons.aim,
            bounds: { x: Math.max(0, viewport.w - 260 - 10), y: 60, width: 260, height: 420 },
        }))

    const showToast = (msg: string) => setToast(msg)

    const openSettings = () => openOrFocus('settings', 'Display Settings', () => ({ kind: 'settings', title: 'Display Settings', icon: '/window.svg', bounds: { x: 120, y: 120, width: 420, height: 360 }, payload: { settings } }))

    return (
        <Root>
            <Desktop onOpenIE={openIE} onOpenAIM={openAIM} onOpenReadme={openReadme} onOpenPhotos={openPhotos} onOpenRecycle={openRecycle} wallpaper={settings} icons={icons} taskbarHeight={TaskbarHeight} />

            {windows
                .slice()
                .sort((a, b) => a.z - b.z)
                .map((w) => (
                    <Window
                        key={w.id}
                        win={w}
                        taskbarHeight={TaskbarHeight}
                        active={!w.minimized && w.z === Math.max(...windows.filter((x) => !x.minimized).map((x) => x.z), 0)}
                        onFocus={() => bringToFront(w.id)}
                        onClose={() => closeWindow(w.id)}
                        onMinimize={() => minimizeWindow(w.id)}
                        onRestore={() => restoreWindow(w.id)}
                        onToggleMaximize={() => toggleMaximize(w.id)}
                        onMove={(dx, dy) => moveWindow(w.id, dx, dy)}
                        onResize={(next) => resizeWindow(w.id, next)}
                        openWindow={openWindow}
                        showToast={showToast}
                    />
                ))}

            <Taskbar
                height={TaskbarHeight}
                windows={windows}
                onClickWin={(id) => {
                    const w = windows.find((x) => x.id === id)
                    if (!w) return
                    if (w.minimized) restoreWindow(id)
                    bringToFront(id)
                }}
                onOpenIE={openIE}
                onOpenAIM={openAIM}
                onOpenSettings={openSettings}
                startIcon={icons.start}
            />

            <Snackbar open={!!toast} onClose={() => setToast(null)} autoHideDuration={2500} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert severity="info" variant="filled">
                    {toast}
                </Alert>
            </Snackbar>
        </Root>
    )
}
