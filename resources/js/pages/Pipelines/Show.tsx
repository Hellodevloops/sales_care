import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Plus } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Stage {
    id: number;
    name: string;
    pipeline_id: number;
}

interface Pipeline {
    id: number;
    name: string;
    stages: Stage[];
    created_at: string;
    updated_at: string;
}

interface PageProps {
    pipeline: Pipeline;
}

const breadcrumbs = [
    { title: 'Dashboard', href: '/dashboard' },
    { title: 'Pipelines', href: '/pipelines' },
    { title: 'Pipeline Details', href: null },
];

export default function PipelineDetail() {
    const { pipeline } = usePage<PageProps>().props;
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingStage, setIsAddingStage] = useState(false);

    const { data: pipelineData, setData: setPipelineData, put: putPipeline, processing: pipelineProcessing, errors: pipelineErrors } = useForm({
        name: pipeline.name,
    });

    const { data: stageData, setData: setStageData, post: postStage, processing: stageProcessing, errors: stageErrors, reset: resetStage } = useForm({
        name: '',
    });

    const handlePipelineSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        putPipeline(route('pipelines.update', pipeline.id), {
            onSuccess: () => setIsEditing(false),
        });
    };

    const handleStageSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        postStage(route('stages.store', pipeline.id), {
            onSuccess: () => {
                setIsAddingStage(false);
                resetStage();
            },
        });
    };

    const { delete: destroyStage } = useForm();

    const handleDeleteStage = (stageId: number) => {
        if (confirm('Are you sure you want to delete this stage?')) {
            destroyStage(route('stages.destroy', stageId));
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Pipeline: ${pipeline.name}`} />
            <div className="flex flex-col gap-6 p-4 md:p-6 lg:p-8 bg-gray-50 min-h-screen">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" onClick={() => window.history.back()}>
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{pipeline.name}</h2>
                            <p className="text-sm text-muted-foreground">{pipeline.stages.length} stages</p>
                        </div>
                    </div>
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                        <Edit className="mr-2 h-4 w-4" />
                        {isEditing ? 'Cancel' : 'Edit Pipeline'}
                    </Button>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader>
                                <CardTitle>Pipeline Information</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Name</p>
                                        <p className="text-sm font-medium">{pipeline.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Created At</p>
                                        <p className="text-sm font-medium">{new Date(pipeline.created_at).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Updated At</p>
                                        <p className="text-sm font-medium">{new Date(pipeline.updated_at).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-6">
                        {isEditing ? (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Edit Pipeline</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handlePipelineSubmit} className="space-y-4">
                                        <div>
                                            <Label htmlFor="name">Name *</Label>
                                            <Input
                                                id="name"
                                                value={pipelineData.name}
                                                onChange={(e) => setPipelineData('name', e.target.value)}
                                                required
                                            />
                                            {pipelineErrors.name && <p className="text-red-500 text-xs">{pipelineErrors.name}</p>}
                                        </div>
                                        <Button type="submit" disabled={pipelineProcessing} className="w-full">
                                            Update Pipeline
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        ) : null}

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex justify-between items-center">
                                    Stages
                                    <Button size="sm" onClick={() => setIsAddingStage(true)}>
                                        <Plus className="mr-2 h-4 w-4" /> Add Stage
                                    </Button>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isAddingStage ? (
                                    <form onSubmit={handleStageSubmit} className="space-y-4 mb-6">
                                        <div>
                                            <Label htmlFor="stageName">Stage Name *</Label>
                                            <Input
                                                id="stageName"
                                                value={stageData.name}
                                                onChange={(e) => setStageData('name', e.target.value)}
                                                required
                                            />
                                            {stageErrors.name && <p className="text-red-500 text-xs">{stageErrors.name}</p>}
                                        </div>
                                        <div className="flex gap-2">
                                            <Button type="submit" disabled={stageProcessing}>
                                                Add Stage
                                            </Button>
                                            <Button variant="outline" onClick={() => setIsAddingStage(false)}>
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                ) : null}
                                <div className="space-y-4">
                                    {pipeline.stages.map((stage) => (
                                        <div key={stage.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
                                            <p className="text-sm font-medium">{stage.name}</p>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDeleteStage(stage.id)}
                                                className="text-red-500"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}