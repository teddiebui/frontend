import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
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
    
  useEffect(() => {
    if (!open || !ticketDetailQuery.error) {
      return;
    }

    toast.error(ticketDetailQuery.error.message || 'Không thể tải chi tiết ticket');

  }, [open, ticketDetailQuery.error, ticketDetailQuery.isError])


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="overflow-hidden border border-slate-200 bg-white p-0 sm:max-w-xl">
          <DialogHeader>
            <div className="border-b border-slate-200 bg-[linear-gradient(180deg,_rgba(248,250,252,1),_rgba(255,255,255,0.96))] px-6 py-5">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="rounded-full border-slate-200 bg-white px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Ticket Preview
                </Badge>
                {selectedTicketId ? (
                  <Badge variant="outline" className="rounded-full border-teal-200 bg-teal-50 px-3 py-1 text-xs text-teal-700">
                    #{selectedTicketId}
                  </Badge>
                ) : null}
              </div>
              <DialogTitle className="mt-4 text-left text-2xl font-semibold text-slate-950">
                Modal mẫu cho ticket
              </DialogTitle>
              <DialogDescription className="mt-2 text-left text-sm leading-6 text-slate-500">
                Modal này đang là bản stub để giữ luồng click từ dashboard. Sau đó có thể mở rộng thành chi tiết ticket đầy đủ, lịch sử chat và form cập nhật.
              </DialogDescription>
            </div>
          </DialogHeader>

          <div className="space-y-4 px-6 py-5">
            {ticketDetailQuery.isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-20 w-full rounded-2xl" />
                <Skeleton className="h-20 w-full rounded-2xl" />
              </div>
            ) : ticket ? (
              <>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
                  <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Tiêu đề</div>
                  <div className="mt-2 text-lg font-semibold text-slate-950">{ticket.title || 'Chưa có tiêu đề'}</div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-3xl border border-slate-200 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Khách hàng</div>
                    <div className="mt-2 text-sm font-medium text-slate-900">{ticket.facebookUser?.facebookName || '- -'}</div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Assignee</div>
                    <div className="mt-2 text-sm font-medium text-slate-900">{ticket.assignee?.name || 'Chưa phân công'}</div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Trạng thái</div>
                    <div className="mt-2 text-sm font-medium text-slate-900">{ticket.progressStatus?.name || '- -'}</div>
                  </div>
                  <div className="rounded-3xl border border-slate-200 p-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-400">Ngày tạo</div>
                    <div className="mt-2 text-sm font-medium text-slate-900">{ticket.createdAt || '- -'}</div>
                  </div>
                </div>

                <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-500">
                  Vùng nội dung này đang chờ bổ sung message timeline, note, category, tag và hành động cập nhật ticket.
                </div>
              </>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-500">
                Chưa có dữ liệu ticket để hiển thị.
              </div>
            )}
          </div>

          <DialogFooter className="border-t border-slate-200 px-6 py-4">
            <DialogClose asChild>
              <Button variant="outline">Đóng</Button>
            </DialogClose>
            <Button type="button">Tiếp tục cập nhật sau</Button>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}

export const MyDialog = memo(MyDialogComponent)
