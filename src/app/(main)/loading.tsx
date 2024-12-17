import { Loader2 } from "lucide-react";

function Loading() {
  return (<>
    <div className="flex flex-1 w-full justify-center items-center" >
      <div className="flex items-center gap-2">
        <Loader2 className="size-5 animate-spin" />
        Loading
      </div>
    </div>
  </>
  );
}

export default Loading;