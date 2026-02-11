"use client";

import { Layers } from "lucide-react";

export function Logo() {
    return (
        <div className="flex items-center gap-2.5 group select-none">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-secondary text-white shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-primary/40">
                <Layers className="h-5 w-5 fill-white/20 stroke-[2.5px]" />
                <div className="absolute inset-0 rounded-xl ring-1 ring-white/20"></div>
            </div>
            <div className="flex flex-col leading-none">
                <span className="text-lg font-bold tracking-tight text-foreground">
                    BG<span className="text-primary">Remover</span>
                </span>
                <span className="text-[0.6rem] font-medium text-muted-foreground uppercase tracking-widest pl-0.5">
                    AI Studio
                </span>
            </div>
        </div>
    );
}
