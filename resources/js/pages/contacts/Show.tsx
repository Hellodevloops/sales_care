import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Edit, ArrowLeft } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

// Contact interface matching backend model
interface Contact {
    id: number;
    name: string;
    phone: string;
    email?: string;
    website?: string;
    city?: string;
    state?: string;
    country?: string;
    company_name?: string;
    owner: { id: number; name: string };
    // deal?: { id: number; name: string };
    created_at: string;
    updated_at: string;
}

interface PageProps {
    contact: Contact;
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contacts', href: '/contacts' },
    { title: 'Contact Details', href: null },
];

export default function ContactDetail() {
    const { contact } = usePage<PageProps>().props;
    const [isEditing, setIsEditing] = useState(false);

    // Form setup for updating contact
    const { data, setData, put, processing, errors } = useForm({
        name: contact.name,
        phone: contact.phone,
        email: contact.email || '',
        website: contact.website || '',
        city: contact.city || '',
        state: contact.state || '',
        country: contact.country || '',
        company_name: contact.company_name || '',
        // deal_id: contact.deal?.id || null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('contacts.update', contact.id), {
            onSuccess: () => setIsEditing(false),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Contact: ${contact.name}`} />
            <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{contact.name}</h2>
                            <p className="text-sm text-muted-foreground">{contact.company_name || 'No company'}</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                            <Edit className="mr-2 h-4 w-4" />
                            {isEditing ? 'Cancel' : 'Edit Contact'}
                        </Button>
                        {contact.email && (
                            <Button variant="outline" asChild>
                                <a href={`mailto:${contact.email}`}>
                                    <Mail className="mr-2 h-4 w-4" />
                                    Email
                                </a>
                            </Button>
                        )}
                        <Button variant="outline" asChild>
                            <a href={`tel:${contact.phone}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                Call
                            </a>
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Left Column - Contact Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-12 w-12">
                                        <AvatarImage src={`/api/placeholder/32/${contact.id}`} />
                                        <AvatarFallback>{contact.name.charAt(0)}{contact.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{contact.name}</p>
                                        <p className="text-sm text-muted-foreground">{contact.owner.name}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {contact.email && (
                                        <div className="flex items-center gap-3">
                                            <Mail className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Email</p>
                                                <a href={`mailto:${contact.email}`} className="text-sm text-blue-600 hover:underline">{contact.email}</a>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <div>
                                            <p className="text-sm text-muted-foreground">Phone</p>
                                            <p className="text-sm">{contact.phone}</p>
                                        </div>
                                    </div>
                                    {(contact.city || contact.state || contact.country) && (
                                        <div className="flex items-center gap-3">
                                            <MapPin className="h-4 w-4 text-muted-foreground" />
                                            <div>
                                                <p className="text-sm text-muted-foreground">Location</p>
                                                <p className="text-sm">
                                                    {contact.city}{contact.city && contact.state ? ', ' : ''}{contact.state} {contact.country}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {contact.website && (
                                        <div className="flex items-center gap-3">
                                            <div className="h-4 w-4">🌐</div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Website</p>
                                                <a href={contact.website} target="_blank" className="text-sm text-blue-600 hover:underline">{contact.website}</a>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Edit Form/Details */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>{isEditing ? 'Edit Contact' : 'Contact Details'}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isEditing ? (
                                    <form onSubmit={handleSubmit} className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Name *</Label>
                                            <Input
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData('name', e.target.value)}
                                                required
                                            />
                                            {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="phone">Phone *</Label>
                                            <Input
                                                id="phone"
                                                value={data.phone}
                                                onChange={(e) => setData('phone', e.target.value)}
                                                required
                                            />
                                            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                value={data.email}
                                                onChange={(e) => setData('email', e.target.value)}
                                            />
                                            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="website">Website</Label>
                                            <Input
                                                id="website"
                                                value={data.website}
                                                onChange={(e) => setData('website', e.target.value)}
                                            />
                                            {errors.website && <p className="text-red-500 text-xs">{errors.website}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                            />
                                            {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="state">State</Label>
                                            <Input
                                                id="state"
                                                value={data.state}
                                                onChange={(e) => setData('state', e.target.value)}
                                            />
                                            {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="country">Country</Label>
                                            <Input
                                                id="country"
                                                value={data.country}
                                                onChange={(e) => setData('country', e.target.value)}
                                            />
                                            {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                                        </div>
                                        <div>
                                            <Label htmlFor="company_name">Company Name</Label>
                                            <Input
                                                id="company_name"
                                                value={data.company_name}
                                                onChange={(e) => setData('company_name', e.target.value)}
                                            />
                                            {errors.company_name && <p className="text-red-500 text-xs">{errors.company_name}</p>}
                                        </div>
                                        <Button type="submit" disabled={processing} className="w-full">
                                            Update Contact
                                        </Button>
                                    </form>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-sm text-muted-foreground">Company</p>
                                                <p className="text-sm font-medium">{contact.company_name || '-'}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Owner</p>
                                                <p className="text-sm font-medium">{contact.owner.name}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Created At</p>
                                                <p className="text-sm font-medium">{new Date(contact.created_at).toLocaleDateString()}</p>
                                            </div>
                                            <div>
                                                <p className="text-sm text-muted-foreground">Updated At</p>
                                                <p className="text-sm font-medium">{new Date(contact.updated_at).toLocaleDateString()}</p>
                                            </div>
                                            {/* {contact.deal && (
                                                <div>
                                                    <p className="text-sm text-muted-foreground">Associated Deal</p>
                                                    <p className="text-sm font-medium">{contact.deal.name}</p>
                                                </div>
                                            )} */}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}