import { useState } from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  Calendar as CalendarIcon, 
  Plus, 
  Filter,
  DollarSign,
  Phone,
  User
} from 'lucide-react';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Default styling

// Setup moment localizer for react-big-calendar
const localizer = momentLocalizer(moment);

interface SalesEvent {
  id: string;
  title: string;
  start: Date;
  end?: Date;
  type: 'follow-up' | 'meeting' | 'deal-close' | 'call';
  client: string;
  amount?: number;
  status: 'pending' | 'completed' | 'missed';
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
  {
    title: 'Sales Calendar',
    href: '/sales-calendar',
  },
];

export default function SalesCalendar() {
  const [events] = useState<SalesEvent[]>([
    {
      id: '1',
      title: 'Follow-up: Acme Corp',
      start: new Date('2025-03-26T10:00:00'),
      end: new Date('2025-03-26T10:30:00'),
      type: 'follow-up',
      client: 'Acme Corp',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Deal Close: TechCo',
      start: new Date('2025-03-27T14:00:00'),
      end: new Date('2025-03-27T15:00:00'),
      type: 'deal-close',
      client: 'TechCo',
      amount: 50000,
      status: 'pending'
    },
    {
      id: '3',
      title: 'Client Call: StartupX',
      start: new Date('2025-03-28T09:30:00'),
      end: new Date('2025-03-28T10:00:00'),
      type: 'call',
      client: 'StartupX',
      status: 'pending'
    }
  ]);

  // Event styling based on type
  const eventStyleGetter = (event: SalesEvent) => {
    let backgroundColor;
    switch (event.type) {
      case 'follow-up':
        backgroundColor = '#3b82f6'; // Blue
        break;
      case 'meeting':
        backgroundColor = '#10b981'; // Green
        break;
      case 'deal-close':
        backgroundColor = '#f59e0b'; // Yellow
        break;
      case 'call':
        backgroundColor = '#8b5cf6'; // Purple
        break;
      default:
        backgroundColor = '#6b7280'; // Gray
    }
    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.8,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    };
  };

  // Custom event component
  const EventComponent = ({ event }: { event: SalesEvent }) => (
    <div className="flex items-center gap-1">
      {event.type === 'deal-close' && <DollarSign className="h-4 w-4" />}
      {event.type === 'call' && <Phone className="h-4 w-4" />}
      {event.type === 'follow-up' && <User className="h-4 w-4" />}
      <span>{event.title}</span>
      {event.amount && (
        <span className="ml-1 text-xs font-semibold">
          (${event.amount.toLocaleString()})
        </span>
      )}
    </div>
  );

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Sales Calendar" />
      <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Sales Calendar
            </CardTitle>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Follow-ups</DropdownMenuItem>
                  <DropdownMenuItem>Meetings</DropdownMenuItem>
                  <DropdownMenuItem>Deal Closes</DropdownMenuItem>
                  <DropdownMenuItem>Calls</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Event
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultView="month"
              views={['month', 'week', 'day']}
              style={{ height: '70vh' }}
              eventPropGetter={eventStyleGetter}
              components={{
                event: EventComponent
              }}
              onSelectEvent={(event) => {
                console.log('Event clicked:', event);
              }}
              onSelectSlot={(slotInfo) => {
                console.log('Slot selected:', slotInfo);
              }}
              selectable
            />
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid auto-rows-min gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Pending Follow-ups</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {events.filter(e => e.type === 'follow-up' && e.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Scheduled Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {events.filter(e => e.type === 'call' && e.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Potential Deals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {events.filter(e => e.type === 'deal-close' && e.status === 'pending').length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Deal Value</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${events.reduce((sum, e) => sum + (e.amount || 0), 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}