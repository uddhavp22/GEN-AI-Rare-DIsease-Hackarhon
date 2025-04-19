"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Download, Send, FileText } from "lucide-react"

type Message = {
  id: string
  content: string
  sender: "user" | "assistant"
  timestamp: Date
}

type EvidencePackage = {
  id: string
  name: string
  createdAt: Date
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "What can we help you with?",
      sender: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [evidencePackage, setEvidencePackage] = useState<EvidencePackage | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "I'm analyzing your medical data to prepare an evidence package for your claim. This will include your diagnosis, medication history, and treatment effectiveness.",
        sender: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Simulate evidence package generation
      setIsGenerating(true)
      setTimeout(() => {
        setIsGenerating(false)
        setEvidencePackage({
          id: "ev-" + Date.now(),
          name: "ClaimClear_Evidence_Package.pdf",
          createdAt: new Date(),
        })

        const completionMessage: Message = {
          id: (Date.now() + 2).toString(),
          content: "I've generated an evidence package based on your medical history. You can download it below.",
          sender: "assistant",
          timestamp: new Date(),
        }

        setMessages((prev) => [...prev, completionMessage])
      }, 3000)
    }, 1000)
  }

  return (
    <div className="flex flex-col h-[600px]">
      <ScrollArea className="flex-1 p-4 mb-4 border rounded-md">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`flex gap-3 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={message.sender === "assistant" ? "bg-[#0e2a47]" : "bg-slate-300"}>
                  <div className="flex h-full items-center justify-center">
                    {message.sender === "assistant" ? "CC" : "EF"}
                  </div>
                </Avatar>
                <div
                  className={`rounded-lg px-4 py-2 ${
                    message.sender === "user" ? "bg-[#0e2a47] text-white" : "bg-slate-100"
                  }`}
                >
                  <p>{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="bg-[#0e2a47]">
                  <div className="flex h-full items-center justify-center">CC</div>
                </Avatar>
                <div className="rounded-lg px-4 py-2 bg-slate-100">
                  <p>Generating evidence package...</p>
                  <div className="mt-2 flex space-x-1">
                    <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="h-2 w-2 rounded-full bg-slate-300 animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {evidencePackage && (
            <div className="flex justify-start">
              <div className="flex gap-3 max-w-[80%]">
                <Avatar className="bg-[#0e2a47]">
                  <div className="flex h-full items-center justify-center">CC</div>
                </Avatar>
                <Card className="p-4 flex items-center gap-3">
                  <div className="bg-slate-100 p-2 rounded-md">
                    <FileText className="h-6 w-6 text-[#0e2a47]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{evidencePackage.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Created {evidencePackage.createdAt.toLocaleString()}
                    </p>
                  </div>
                  <Button size="sm" className="bg-[#0e2a47] hover:bg-[#173b61]">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </Card>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message here..."
          className="flex-1"
        />
        <Button type="submit" className="bg-[#0e2a47] hover:bg-[#173b61]">
          <Send className="h-4 w-4 mr-2" />
          Send
        </Button>
      </form>
    </div>
  )
}
