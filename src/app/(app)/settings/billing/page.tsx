
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, CreditCard, Download, PlusCircle, Zap } from "lucide-react"; // Added Zap for trial
import { useToast } from "@/hooks/use-toast";

interface Plan {
  name: string;
  price: string;
  features: string[];
  isCurrent?: boolean;
  isTrial?: boolean;
}

const plans: Plan[] = [
  { 
    name: "Free Trial", 
    price: "Free for 30 days", 
    features: [
      "1 Social Account", 
      "Basic Automations", 
      "100 Scheduled Posts/mo", 
      "Community Support"
    ],
    isTrial: true,
  },
  { 
    name: "Starter", 
    price: "$4/mo", 
    features: [
      "1 Social Account", 
      "Basic Automations", 
      "500 Scheduled Posts/mo", 
      "Community Support"
    ], 
    isCurrent: true 
  },
  { 
    name: "Pro", 
    price: "$9/mo", 
    features: [
      "5 Social Accounts", 
      "Advanced Automations", 
      "Unlimited Posts", 
      "Priority Support", 
      "AI Analytics"
    ] 
  },
  { 
    name: "Business", 
    price: "$49/mo", 
    features: [
      "Unlimited Accounts", 
      "All Pro Features", 
      "Team Collaboration", 
      "Dedicated Account Manager"
    ] 
  },
];

const paymentMethods = [
    { id: "pm1", type: "Visa", last4: "4242", expiry: "12/25" },
];

const invoices = [
    { id: "inv1", date: "2024-06-01", amount: "$19.00", status: "Paid", pdfUrl: "#" }, // Kept old price for history
    { id: "inv2", date: "2024-05-01", amount: "$19.00", status: "Paid", pdfUrl: "#" }, // Kept old price for history
];

export default function BillingSettingsPage() {
  const { toast } = useToast();

  return (
    <div className="space-y-8 max-w-5xl mx-auto"> {/* Increased max-width for 4 cards */}
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Subscription Plan</CardTitle>
          <CardDescription>Manage your RepliGo subscription and billing details.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"> {/* Adjusted grid for 4 cards */}
          {plans.map(plan => (
            <Card key={plan.name} className={plan.isCurrent ? "border-primary ring-2 ring-primary shadow-lg" : (plan.isTrial ? "border-accent ring-2 ring-accent shadow-lg" : "shadow-md")}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  {plan.name}
                  {plan.isCurrent && <Badge className="bg-primary text-primary-foreground">Current Plan</Badge>}
                  {plan.isTrial && <Badge variant="outline" className="border-accent text-accent"><Zap className="mr-1 h-3 w-3" />Trial</Badge>}
                </CardTitle>
                <CardDescription className="text-3xl font-bold text-foreground">{plan.price}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {plan.features.map(feature => (
                    <li key={feature} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className="w-full" 
                  variant={plan.isCurrent ? "outline" : (plan.isTrial ? "default" : "default")} 
                  disabled={plan.isCurrent} 
                  onClick={() => toast({title: "Plan Change (Demo)", description: `Selected ${plan.name} plan.`})}
                >
                  {plan.isCurrent ? "Your Current Plan" : (plan.isTrial ? "Start Free Trial" : "Choose Plan")}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline">Payment Methods</CardTitle>
        </CardHeader>
        <CardContent>
            {paymentMethods.map(pm => (
                 <div key={pm.id} className="flex items-center justify-between p-3 border rounded-md mb-2">
                    <div className="flex items-center gap-3">
                        <CreditCard className="h-6 w-6 text-muted-foreground"/>
                        <div>
                            <p className="font-medium">{pm.type} ending in {pm.last4}</p>
                            <p className="text-xs text-muted-foreground">Expires {pm.expiry}</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => toast({title: "Manage Payment (Demo)"})}>Manage</Button>
                 </div>
            ))}
          <Button variant="default" className="mt-2" onClick={() => toast({title: "Add Payment Method (Demo)"})}>
            <PlusCircle className="mr-2 h-4 w-4" /> Add Payment Method
          </Button>
        </CardContent>
      </Card>
      
      <Card className="shadow-xl">
        <CardHeader>
          <CardTitle className="font-headline">Billing History</CardTitle>
          <CardDescription>View and download your past invoices.</CardDescription>
        </CardHeader>
        <CardContent>
            {invoices.map((invoice, index) => (
                <div key={invoice.id}>
                    <div className="flex items-center justify-between py-3">
                        <div>
                            <p className="font-medium">Invoice #{invoice.id.slice(-4)} - {invoice.date}</p>
                            <p className="text-sm text-muted-foreground">Amount: {invoice.amount} - <span className={invoice.status === "Paid" ? "text-green-600" : "text-red-600"}>{invoice.status}</span></p>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                            <a href={invoice.pdfUrl} target="_blank" rel="noopener noreferrer">
                                <Download className="mr-2 h-4 w-4" /> Download PDF
                            </a>
                        </Button>
                    </div>
                    {index < invoices.length -1 && <Separator />}
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
