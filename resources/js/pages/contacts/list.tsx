import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Mail, Phone, Edit, Trash2, Plus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEvent, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

// Type definition for Contact
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
    deal?: { id: number; name: string };
}

interface PageProps {
    contacts: {
        data: Contact[];
        links: any;
    };
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Contacts', href: '/contacts' },
];

export default function ContactList() {
    const { contacts } = usePage<PageProps>().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Form setup for creating/updating contacts
    const { data, setData, post, put, delete: destroy, processing, errors, reset } = useForm({
        id: null as number | null,
        name: '',
        phone: '',
        email: '',
        website: '',
        city: '',
        state: '',
        country: '',
        company_name: '',
        deal_id: null as number | null,
    });

    // Filter contacts based on search term
    const filteredContacts = contacts.data.filter(contact =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (contact.email && contact.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (contact.company_name && contact.company_name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Handle form submission
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (data.id) {
            put(route('contacts.update', data.id), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        } else {
            post(route('contacts.store'), {
                onSuccess: () => {
                    setIsDialogOpen(false);
                    reset();
                },
            });
        }
    };

    // Handle edit
    const handleEdit = (contact: Contact) => {
        setData({
            id: contact.id,
            name: contact.name,
            phone: contact.phone,
            email: contact.email || '',
            website: contact.website || '',
            city: contact.city || '',
            state: contact.state || '',
            country: contact.country || '',
            company_name: contact.company_name || '',
            deal_id: contact.deal?.id || null,
        });
        setIsDialogOpen(true);
    };

    // Handle delete
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this contact?')) {
            destroy(route('contacts.destroy', id));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Contact List" />
            <div className="flex flex-1 flex-col gap-6 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Contact List</h2>
                        <p className="text-sm text-gray-600">Manage your contacts</p>
                    </div>
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">
                                <Plus className="mr-2 h-4 w-4" /> Add Contact
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{data.id ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
                            </DialogHeader>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Name *</Label>
                                    <Input id="name" value={data.name} onChange={e => setData('name', e.target.value)} required />
                                    {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone *</Label>
                                    <Input id="phone" value={data.phone} onChange={e => setData('phone', e.target.value)} required />
                                    {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" value={data.email} onChange={e => setData('email', e.target.value)} />
                                    {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="website">Website</Label>
                                    <Input id="website" value={data.website} onChange={e => setData('website', e.target.value)} />
                                    {errors.website && <p className="text-red-500 text-xs">{errors.website}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input id="city" value={data.city} onChange={e => setData('city', e.target.value)} />
                                    {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="state">State</Label>
                                    <Input id="state" value={data.state} onChange={e => setData('state', e.target.value)} />
                                    {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Input id="country" value={data.country} onChange={e => setData('country', e.target.value)} />
                                    {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
                                </div>
                                <div>
                                    <Label htmlFor="company_name">Company Name</Label>
                                    <Input id="company_name" value={data.company_name} onChange={e => setData('company_name', e.target.value)} />
                                    {errors.company_name && <p className="text-red-500 text-xs">{errors.company_name}</p>}
                                </div>
                                <Button type="submit" disabled={processing} className="w-full">
                                    {data.id ? 'Update' : 'Create'} Contact
                                </Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Search and Table */}
                <Card className="bg-white border-gray-200">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold text-gray-800">Contacts</CardTitle>
                        <CardDescription className="text-sm text-gray-600">Your current contacts</CardDescription>
                        <Input
                            placeholder="Search by name, email, or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="mt-2 max-w-md"
                        />
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Location</TableHead>
                                    <TableHead>Owner</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredContacts.map((contact) => (
                                    <TableRow key={contact.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage src={`/api/placeholder/32/${contact.id}`} />
                                                    <AvatarFallback>{contact.name.charAt(0)}{contact.name.split(' ')[1]?.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                {contact.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {contact.email && (
                                                <div className="flex items-center gap-1">
                                                    <Mail className="h-4 w-4 text-gray-500" />
                                                    {contact.email}
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Phone className="h-4 w-4 text-gray-500" />
                                                {contact.phone}
                                            </div>
                                        </TableCell>
                                        <TableCell>{contact.company_name || '-'}</TableCell>
                                        <TableCell>
                                            {contact.city || contact.state || contact.country
                                                ? `${contact.city || ''}${contact.city && contact.state ? ', ' : ''}${contact.state || ''} ${contact.country || ''}`
                                                : '-'}
                                        </TableCell>
                                        <TableCell>{contact.owner.name}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex gap-2 justify-end">
                                                <Button variant="ghost" size="sm" onClick={() => handleEdit(contact)}>
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(contact.id)}
                                                    className="text-red-500 hover:text-red-700"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {filteredContacts.length === 0 && (
                            <div className="text-center py-4 text-gray-500">
                                No contacts found matching your criteria.
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}