import { Badge } from "@repo/ui/components/badge"
import { Button } from "@repo/ui/components/button"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@repo/ui/components/card"
import { useTheme } from "@repo/ui/hooks/use-theme"
import {
	CheckCircle2,
	Code2,
	Layers,
	Moon,
	Server,
	Sparkles,
	Sun,
	Wrench,
} from "@repo/ui/icons"

const stackItems = [
	{
		title: "React + Vite",
		description: "Fast UI foundation.",
		icon: Code2,
	},
	{
		title: "NestJS Backend",
		description: "Structured server layer.",
		icon: Server,
	},
	{
		title: "TypeScript",
		description: "Type safety across the stack.",
		icon: CheckCircle2,
	},
	{
		title: "Biome",
		description: "Unified lint and format.",
		icon: Wrench,
	},
	{
		title: "Turborepo",
		description: "Monorepo workflows made simple.",
		icon: Layers,
	},
	{
		title: "shadcn/ui",
		description: "Clean, composable UI.",
		icon: Sparkles,
	},
]

function App() {
	const { isDark, toggleTheme } = useTheme()

	return (
		<main className="bg-background text-foreground relative min-h-screen overflow-hidden bg-linear-to-b from-background via-muted/30 to-background px-6 py-12">
			<div className="bg-primary/10 pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full blur-3xl" />
			<div className="bg-secondary/60 pointer-events-none absolute -bottom-24 left-0 h-72 w-72 rounded-full blur-3xl" />

			<div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8">
				<section className="relative overflow-hidden rounded-2xl border bg-card/70 p-8 shadow-sm backdrop-blur md:p-10">
					<div className="pointer-events-none absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-transparent" />
					<div className="relative space-y-8">
						<div className="flex items-center justify-between gap-3">
							<Badge variant="secondary" className="gap-1.5">
								<Sparkles className="size-3" />
								Starter Kit
							</Badge>
							<Button
								variant="outline"
								size="sm"
								onClick={toggleTheme}
								className="gap-2 hover:cursor-pointer"
							>
								{isDark ? (
									<Sun className="size-4" />
								) : (
									<Moon className="size-4" />
								)}
								{isDark ? "Light" : "Dark"} mode
							</Button>
						</div>

						<div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
							<div className="space-y-5">
								<h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-5xl">
									Build fast. Scale cleanly.
								</h1>
								<p className="text-muted-foreground max-w-2xl text-base md:text-lg">
									An opinionated monorepo starter kit for modern web
									development.
								</p>
							</div>
						</div>
					</div>
				</section>

				<section className="space-y-4">
					<div className="flex items-center justify-between gap-4">
						<div>
							<h2 className="text-2xl font-semibold tracking-tight">
								What’s included
							</h2>
							<p className="text-muted-foreground text-sm">
								Everything you need to start building immediately.
							</p>
						</div>
						<Badge variant="outline" className="gap-1.5">
							<CheckCircle2 className="size-3" />
							Production-ready defaults
						</Badge>
					</div>

					<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
						{stackItems.map((item) => {
							const Icon = item.icon

							return (
								<Card
									key={item.title}
									className="group gap-4 border-border/70 py-5 transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/35"
								>
									<CardHeader className="space-y-2 pb-0">
										<div className="flex items-start justify-between gap-3">
											<div className="bg-primary/10 text-primary group-hover:bg-primary/15 flex h-9 w-9 items-center justify-center rounded-md transition-colors">
												<Icon className="size-4" />
											</div>
											<Badge variant="outline" className="gap-1">
												<CheckCircle2 className="size-3" />
												Included
											</Badge>
										</div>
										<CardTitle className="text-xl">{item.title}</CardTitle>
									</CardHeader>
									<CardContent>
										<CardDescription className="text-sm leading-relaxed">
											{item.description}
										</CardDescription>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</section>
			</div>
		</main>
	)
}

export default App
