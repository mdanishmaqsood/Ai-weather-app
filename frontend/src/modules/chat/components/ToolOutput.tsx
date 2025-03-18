import type { ToolCall } from '@/types/';
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/card';
import {
  Loader2,
  MapPin,
  Calendar,
  CloudSun,
  Check,
  ExternalLink,
} from 'lucide-react';
import { Badge } from '@/shadcn/badge';
import { Button } from '@/shadcn/button';
import { cn } from '@/lib/cn';

interface ToolOutputProps {
  toolCall: ToolCall;
}

export default function ToolOutput({ toolCall }: ToolOutputProps) {
  if (toolCall.status === 'running') {
    return (
      <Card className="w-full border border-dashed animate-pulse bg-muted/30">
        <CardHeader className="p-3">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-primary" />
            <CardTitle className="text-sm font-medium">
              {getToolTitle(toolCall.type)}
            </CardTitle>
          </div>
        </CardHeader>
      </Card>
    );
  }

  if (!toolCall.output) return null;

  let output;
  try {
    output =
      typeof toolCall.output === 'string'
        ? JSON.parse(toolCall.output)
        : toolCall.output;
  } catch (e) {
    output = toolCall.output;
  }

  switch (toolCall.type) {
    case 'get_weather':
      return <WeatherOutput data={output} />;
    case 'get_dealership_address':
      return <DealershipOutput data={output} />;
    case 'check_appointment_availability':
      return <AppointmentSlotsOutput data={output} />;
    case 'schedule_appointment':
      return <AppointmentConfirmationOutput data={output} />;
    default:
      return (
        <Card className="w-full">
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-medium">Tool Result</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <pre className="text-xs overflow-auto p-2 bg-muted rounded">
              {JSON.stringify(output, null, 2)}
            </pre>
          </CardContent>
        </Card>
      );
  }
}

function getToolTitle(type: string): string {
  switch (type) {
    case 'get_weather':
      return 'Weather Information';
    case 'get_dealership_address':
      return 'Dealership Location';
    case 'check_appointment_availability':
      return 'Available Appointment Slots';
    case 'schedule_appointment':
      return 'Appointment Confirmation';
    default:
      return 'Tool Result';
  }
}

function WeatherOutput({ data }: { data: any }) {
  return (
    <Card className="w-full overflow-hidden border-blue-100 dark:border-blue-900">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/20 opacity-50" />
      <CardHeader className="p-3 relative">
        <div className="flex items-center gap-2">
          <CloudSun className="h-4 w-4 text-blue-500" />
          <CardTitle className="text-sm font-medium">
            Weather in {data.location}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 relative">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold">{data.temperature}°F</p>
            <p className="text-sm text-muted-foreground">{data.condition}</p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900/40 p-4 rounded-lg">
            <CloudIcon
              condition={data.condition}
              className="h-12 w-12 text-blue-500"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            <p className="text-xs text-muted-foreground">Humidity</p>
            <p className="text-sm font-medium">{data.humidity}%</p>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
            <p className="text-xs text-muted-foreground">Wind</p>
            <p className="text-sm font-medium">{data.windSpeed} mph</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function CloudIcon({
  condition,
  className,
}: {
  condition: string;
  className?: string;
}) {
  // Simple switch for different weather icons based on condition
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <CloudSun className={className} />;
    case 'partly cloudy':
      return <CloudSun className={className} />;
    case 'cloudy':
      return <Cloud className={className} />;
    case 'rainy':
      return <CloudRain className={className} />;
    default:
      return <CloudSun className={className} />;
  }
}

function DealershipOutput({ data }: { data: any }) {
  return (
    <Card className="w-full overflow-hidden border-red-100 dark:border-red-900">
      <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950/30 dark:to-red-900/20 opacity-50" />
      <CardHeader className="p-3 relative">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-500" />
          <CardTitle className="text-sm font-medium">{data.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 relative">
        <div className="flex flex-col md:flex-row md:items-start gap-4">
          <div className="flex-1">
            <p className="text-sm">{data.address}</p>
            <p className="text-sm">
              {data.city}, {data.state} {data.zip}
            </p>
            <p className="text-sm mt-2 font-medium">{data.phone}</p>
            <p className="text-sm text-muted-foreground">Hours: {data.hours}</p>
          </div>
          <div className="bg-red-100 dark:bg-red-900/40 p-3 rounded-lg text-center">
            <MapPin className="h-8 w-8 text-red-500 mx-auto mb-1" />
            <Button variant="outline" size="sm" className="text-xs gap-1 mt-1">
              <ExternalLink className="h-3 w-3" />
              Directions
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentSlotsOutput({ data }: { data: any }) {
  return (
    <Card className="w-full overflow-hidden border-green-100 dark:border-green-900">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 opacity-50" />
      <CardHeader className="p-3 relative">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-green-500" />
          <CardTitle className="text-sm font-medium">
            Available Appointments
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 relative">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {data.slots.map((slot: string, index: number) => (
            <Badge
              key={index}
              variant="outline"
              className={cn(
                'justify-center py-1.5 hover:bg-green-100 dark:hover:bg-green-900/40 cursor-pointer transition-colors',
                'border-green-200 dark:border-green-800'
              )}
            >
              {slot}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function AppointmentConfirmationOutput({ data }: { data: any }) {
  return (
    <Card className="w-full overflow-hidden border-green-200 dark:border-green-900">
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/20 opacity-50" />
      <CardHeader className="p-3 relative">
        <div className="flex items-center gap-2">
          <div className="bg-green-100 dark:bg-green-900/40 p-1 rounded-full">
            <Check className="h-3 w-3 text-green-600" />
          </div>
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">
            Appointment Confirmed
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 relative">
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="text-sm font-medium">{data.date}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Time</p>
            <p className="text-sm font-medium">{data.time}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Service</p>
            <p className="text-sm font-medium">{data.service}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Location</p>
            <p className="text-sm font-medium">{data.location}</p>
          </div>
        </div>

        <div className="mt-3 p-2 bg-green-100 dark:bg-green-900/40 rounded border border-green-200 dark:border-green-800 text-center">
          <p className="text-xs text-muted-foreground">Confirmation Code</p>
          <p className="text-sm font-bold text-green-700 dark:text-green-400">
            {data.confirmationCode}
          </p>
        </div>

        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" className="flex-1 gap-1">
            <Calendar className="h-3 w-3" />
            Add to Calendar
          </Button>
          <Button variant="outline" size="sm" className="flex-1 gap-1">
            <Share className="h-3 w-3" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Missing icon components
function Cloud({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function CloudRain({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M16 14v6" />
      <path d="M8 14v6" />
      <path d="M12 16v6" />
    </svg>
  );
}

function Share({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
