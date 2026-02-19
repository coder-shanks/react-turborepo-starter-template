import { useEffect, useState } from "react"

type Theme = "light" | "dark"

const STORAGE_KEY = "theme"

const getInitialTheme = (): Theme => {
	const storedTheme = localStorage.getItem(STORAGE_KEY)
	if (storedTheme === "light" || storedTheme === "dark") {
		return storedTheme
	}

	return window.matchMedia("(prefers-color-scheme: dark)").matches
		? "dark"
		: "light"
}

export function useTheme() {
	const [theme, setTheme] = useState<Theme>(getInitialTheme)

	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark")
		localStorage.setItem(STORAGE_KEY, theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme((currentTheme: Theme) =>
			currentTheme === "dark" ? "light" : "dark",
		)
	}

	return {
		theme,
		isDark: theme === "dark",
		toggleTheme,
	}
}
