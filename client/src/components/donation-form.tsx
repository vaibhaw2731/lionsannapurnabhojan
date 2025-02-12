
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertDonationSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";

const extendedDonationSchema = insertDonationSchema.extend({
  amount: z.number().min(50, "Minimum donation amount is ₹50"),
  email: z.string().email().optional(),
});

declare global {
  interface Window {
    Paytm: any;
  }
}

export default function DonationForm() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(extendedDonationSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: 50,
      paymentId: "",
      date: new Date().toISOString(),
    },
  });

  const mutation = useMutation({
    mutationFn: async (values: any) => {
      // First get order token from our server
      const response = await apiRequest("POST", "/api/create-payment", {
        amount: values.amount,
        email: values.email,
        name: values.name,
      });

      const config = {
        root: "",
        flow: "DEFAULT",
        data: {
          orderId: response.orderId,
          token: response.txnToken,
          tokenType: "TXN_TOKEN",
          amount: values.amount,
        },
        handler: {
          notifyMerchant: function(eventName: string, data: any) {
            console.log("notifyMerchant handler function called");
            console.log("eventName => ", eventName);
            console.log("data => ", data);
          }
        }
      };

      return new Promise((resolve, reject) => {
        window.Paytm.CheckoutJS.init(config)
          .then(function onSuccess() {
            window.Paytm.CheckoutJS.invoke();
          })
          .catch(function onError(error: any) {
            reject(error);
          });
      });
    },
    onSuccess: () => {
      toast({ title: "Thank you for your donation!" });
      form.reset();
    },
    onError: () => {
      toast({ 
        title: "Failed to process donation",
        variant: "destructive"
      });
    },
  });

  return (
    <section id="donate" className="scroll-mt-16 max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-center mb-12">Make a Donation</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount (₹) *</FormLabel>
                <FormControl>
                  <Input 
                    type="number" 
                    min="50"
                    {...field} 
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Processing..." : "Donate Now"}
          </Button>
        </form>
      </Form>
    </section>
  );
}
