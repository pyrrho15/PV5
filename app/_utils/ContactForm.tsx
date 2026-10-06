"use client"
import { ArrowRight } from "lucide-react"
import { useState } from "react"

export default function ContactForm() {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        message: ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(formData)
        // Add form submission logic here
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-3 w-full max-w-md">
            <div className="space-y-1">
                <input
                    placeholder="Full Name"
                    type="text"
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 bg-white"
                    required
                />
            </div>
            <div className="space-y-1">
                <input
                    placeholder="Email Address"
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 bg-white"
                    required
                />
            </div>
            <div className="space-y-1">
                <textarea
                    placeholder="Your message here"
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 bg-white resize-none"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full items-center justify-center flex bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-neutral-800 transition-colors"
            >
                <p className="flex items-center gap-x-2">
                    Send
                    <ArrowRight  color="currentColor" size={18}/>
                </p>
            </button>
        </form>
    )
}
