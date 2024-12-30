export default function Ping(){

    return(<>
    <div className="relative">
        <div className="absolute -left-4 top-1">
            <span className="flex size-[11px]">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" >
                </span>
                <span className="relative inline-flex size-[11px] h-full w-full bg-primary rounded-full"></span>
            </span>
        </div>
    </div>
    </>)
}