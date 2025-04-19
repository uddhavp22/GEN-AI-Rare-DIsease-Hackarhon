"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LogOut } from "lucide-react"
import { PatientData } from "@/components/ui/patient-data"
import { ChatInterface } from "@/components/ui/chat-interface"

export default function DashboardPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image src="/logo.png" alt="ClaimClear Logo" fill className="object-contain" />
            </div>
            <h1 className="text-xl font-bold text-[#0e2a47]">ClaimClear</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium">Edward Fisher</p>
              <p className="text-sm text-muted-foreground">Patient ID: P-78542</p>
            </div>
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="medical-data" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="medical-data">Medical Data</TabsTrigger>
            <TabsTrigger value="chat">Chat Assistance</TabsTrigger>
          </TabsList>

          <TabsContent value="medical-data" className="space-y-6">
            <PatientData />
          </TabsContent>

          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Chat Assistance</CardTitle>
              </CardHeader>
              <CardContent>
                <ChatInterface />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
