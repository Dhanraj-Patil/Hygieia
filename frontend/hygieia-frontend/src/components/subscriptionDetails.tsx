"use client";

import { Button } from "./ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "./ui/dialog";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "./ui/table";
import { ScrollArea } from "./ui/scroll-area";
import { XCircle, FileText } from "lucide-react";

export default function SubscriptionDetails({
  selectedExpert,
  handleCancelSubscription,
}) {
  return (
    <DialogContent className="sm:max-w-[600px]">
      <DialogHeader>
        <DialogTitle>Subscription Details</DialogTitle>
        <DialogDescription>
          Detailed information about your current subscription
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold">Plan Details</h4>
          <p>Plan: {selectedExpert?.subscription.plan}</p>
          <p>
            Price: ${selectedExpert?.subscription.price} /{" "}
            {selectedExpert?.subscription.billingCycle}
          </p>
          <p>
            Sessions: {selectedExpert?.subscription.sessionsCompleted} of{" "}
            {selectedExpert?.subscription.totalSessions} completed
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Features</h4>
          <ul className="list-disc list-inside">
            {selectedExpert?.subscription.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Payment Method</h4>
          <p>Type: {selectedExpert?.subscription.paymentMethod.type}</p>
          <p>
            Card ending in: {selectedExpert?.subscription.paymentMethod.last4}
          </p>
          <p>Expiry: {selectedExpert?.subscription.paymentMethod.expiryDate}</p>
        </div>
        <div>
          <h4 className="font-semibold">Invoices</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Mode</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedExpert?.subscription.invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.id}</TableCell>
                  <TableCell>{invoice.date}</TableCell>
                  <TableCell>${invoice.amount}</TableCell>
                  <TableCell>{invoice.status}</TableCell>
                  <TableCell>{invoice.mode}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div>
          <h4 className="font-semibold">Completed Sessions</h4>
          <ScrollArea className="h-[200px] w-full rounded-md border p-4">
            {selectedExpert?.subscription.completedSessions.map(
              (session, index) => (
                <div key={index} className="mb-4">
                  <p className="font-medium">
                    {session.date} at {session.time}
                  </p>
                  <p className="text-sm text-gray-500">{session.brief}</p>
                </div>
              ),
            )}
          </ScrollArea>
        </div>
      </div>
      <DialogFooter>
        <Button
          variant="outline"
          onClick={() => handleCancelSubscription(selectedExpert?.id)}
        >
          <XCircle className="h-4 w-4 mr-2" />
          Cancel Subscription
        </Button>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          Download Invoices
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
