import { Rss } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SiteNotLive() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md text-center border-dashed">
        <CardHeader className="flex flex-col items-center gap-3">
          <Rss className="h-8 w-8 text-muted-foreground" />
          <CardTitle className="text-xl">
            {process.env.SITE_NAME} {} isn&apos;t live yet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            We&apos;re working on it. Check back soon.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
