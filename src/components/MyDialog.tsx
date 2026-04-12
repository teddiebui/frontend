import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTicket } from "@/hooks/useTicket"
import { memo, useEffect } from "react"
import { toast } from "sonner"

type MyDialogProps = {
    open: boolean,
    onOpenChange: (open: boolean) => void,
    selectedTicketId?: number | undefined,
}

function MyDialogComponent({ open, onOpenChange, selectedTicketId }: MyDialogProps) {
  const { ticketDetailQuery } = useTicket(selectedTicketId, {
    enableTicketDetail: open,
  });
    const ticket = ticketDetailQuery.data;

    console.log("ticket data", ticket);
    
    useEffect(() => {
      if (!open || !ticketDetailQuery.error) {
            return;
        }

        toast.error(ticketDetailQuery.error.message || 'Không thể tải chi tiết ticket');

    }, [open, ticketDetailQuery.error, ticketDetailQuery.isError])


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent id="ticketFullDetailModal" className="sm:max-w-sm ticket-detail-modal">
          <DialogHeader>
            <DialogTitle>Chi Tiết Toàn Bộ Ticket</DialogTitle>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Username</Label>
              <Input id="username-1" name="username" defaultValue="@peduarte" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export const MyDialog = memo(MyDialogComponent)
