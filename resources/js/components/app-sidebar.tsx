import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Users, 
    CalendarDays,
    ClipboardList, 
    DollarSign, 
    Settings,
    BarChart2,
    UserCog,
    Briefcase,
    MessageSquare,
    Target,
    BookOpen,
    HelpCircle,
    Shield,          // Added for Roles & Permissions
    UserPlus         // Added for Users Management
} from 'lucide-react';
import AppLogo from './app-logo';

// Main navigation items for Sales CRM
const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Leads',
        href: '/leads',
        icon: Target,
    },
    {
        title: 'Contacts',
        href: '/contacts',
        icon: Users,
    },
    {
        title: 'Demo Book',
        href: '/demo',
        icon: Briefcase,
    },
    {
        title: 'Calendar',
        href: '/calendar',
        icon: CalendarDays,
    },
    {
        title: 'Tasks',
        href: '/tasks',
        icon: ClipboardList,
    },
    
    {
        title: 'Reports',
        href: '/reports',
        icon: BarChart2,
    },
    {
        title: 'Team',
        href: '/team',
        icon: UserCog,
    },
    {
        title: 'Users Management',
        href: '/users',
        icon: UserPlus,
    },
    {
        title: 'Roles & Permissions',
        href: '/roles-permissions',
        icon: Shield,
    },
    {
        title: 'Settings',
        href: '/settings',
        icon: Settings,
    },
];

// Footer navigation items
const footerNavItems: NavItem[] = [
    {
        title: 'Help Center',
        href: '/help',
        icon: HelpCircle,
    },
    {
        title: 'Documentation',
        href: '/documentation',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}