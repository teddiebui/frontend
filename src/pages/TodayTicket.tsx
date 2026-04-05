import React, { useState, useEffect, useCallback } from "react";
import { TicketMetrics } from "@/components/today-ticket/TicketMetrics";
import { TicketList } from "@/components/today-ticket/TicketList";
import { TicketDetailModal } from "@/components/today-ticket/TicketDetailModal";
import { TicketInfo } from "@/components/today-ticket/TicketInfo";
import { TicketHistory } from "@/components/today-ticket/TicketHistory";
import { ChatBox } from "@/components/today-ticket/ChatBox";
import { useTicket } from "@/hooks/useTicket";

export default function TodayTicket() {
  const { dashboard, fetchDashboard, loading, tickets, search, ticketDetail, fetchById, notes } = useTicket();
  // TODO: fetch messages for ChatBox (add to useTicket or use a new hook)
  const [lastUpdated, setLastUpdated] = useState<string>("--:--");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  // Calculate metrics from dashboard data
  const metrics = React.useMemo(() => {
    let total = dashboard.length;
    let inProgress = 0;
    let onHold = 0;
    let resolved = 0;
    dashboard.forEach((ticket) => {
      switch (ticket.progressStatus?.code) {
        case "IN_PROGRESS":
          inProgress++;
          break;
        case "ON_HOLD":
          onHold++;
          break;
        case "RESOLVED":
          resolved++;
          break;
        default:
          break;
      }
    });
    return { total, inProgress, onHold, resolved };
  }, [dashboard]);

  // Initial fetch
  useEffect(() => {
    fetchDashboard();
    setLastUpdated(new Date().toLocaleTimeString());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refresh handler
  const handleRefresh = useCallback(() => {
    fetchDashboard();
    setLastUpdated(new Date().toLocaleTimeString());
  }, [fetchDashboard]);

  // Search handler
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    search({ title: term } as any); // TODO: refine criteria as needed
  };

  // Ticket select handler
  const handleSelectTicket = (ticketId: number) => {
    setSelectedTicketId(ticketId);
    fetchById(ticketId);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTicketId(null);
  };

  return (
    <div className="dashboard-content page-main-content d-flex flex-column">
      <div className="h-100 flex-grow-1 d-flex flex-column" id="ticketSection">
        <TicketMetrics
          total={metrics.total}
          inProgress={metrics.inProgress}
          onHold={metrics.onHold}
          resolved={metrics.resolved}
          lastUpdated={lastUpdated}
          onRefresh={handleRefresh}
        />
        <TicketList
          tickets={dashboard}
          searchTerm={searchTerm}
          onSearch={handleSearch}
          onSelectTicket={handleSelectTicket}
        />
        <TicketDetailModal
          open={modalOpen}
          ticket={ticketDetail}
          onClose={handleCloseModal}
        >
          <div className="container-fluid p-0">
            <div className="row g-0" style={{ height: '80vh' }}>
              <div className="col-3 border-end">
                <TicketInfo ticket={ticketDetail} />
              </div>
              <div className="col-6">
                <ChatBox messages={messages} />
              </div>
              <div className="col-3 border-start">
                <TicketHistory history={notes} />
              </div>
            </div>
          </div>
        </TicketDetailModal>
      </div>
    </div>
  );
}