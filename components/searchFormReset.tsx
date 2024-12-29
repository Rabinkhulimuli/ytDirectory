"use client"
import Link from "next/link"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FormReset(){
    const reset=()=> {
        const form=document.querySelector('.search-form') as HTMLFormElement
        if(form) form.reset()
    }
    return (<>
            <Button type="reset" onClick={reset} className="search-btn">
                <Link href="/" className="search-btn text-white">
                <X className="size-5" />
                </Link>
            </Button>
    </>)
}