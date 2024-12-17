import LoadingButton from "@/components/LoadingButton";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function Loading() {
  return (
    <section className="flex w-full items-center justify-center px-4">
      <form >
        <Card className="mx-auto min-w-96 h-fit">
          <CardHeader>
            <CardTitle className="text-2xl"><Skeleton className="w-2/5 h-8" /></CardTitle>
            <CardDescription>
              <Skeleton className="w-full h-5" />
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="space-y-2">
              <div className="py-0.5">
                <Skeleton className="w-1/4 h-4" />
              </div>
              <div className="mt-2">
                <Skeleton className="w-full h-10" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="py-0.5 flex justify-between">
                <Skeleton className="w-1/4 h-4" />
                <Skeleton className="w-2/5 h-4" />
              </div>
              <div className="">
                <Skeleton className="w-full h-10" />
              </div>
            </div>
          </CardContent>
          <CardFooter className="grid gap-4">
            <LoadingButton loading={true} disabled className="w-full" />
            <Skeleton className="w-full h-5" />
          </CardFooter>
        </Card >
      </form>
    </section>
  );
}

export default Loading;