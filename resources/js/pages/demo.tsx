// External Libraries
import { useState, useEffect } from 'react';
import { Head } from '@inertiajs/react';
import Cal, { getCalApi } from "@calcom/embed-react";
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

// Icons
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Target, 
  Clock 
} from 'lucide-react';

// UI Components
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Local Imports
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

// Breadcrumb Configuration
const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function SalesDashboard() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({"namespace":"30min"});
            cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
        })();
    }, []);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Sales Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">

            <Cal 
                namespace="30min"
                calLink="boondock-live-y1hibx/30min"
                style={{width:"100%", height:"100%", overflow:"scroll"}}
                config={{"layout":"month_view"}}
            />
            </div>
        </AppLayout>
    );
}