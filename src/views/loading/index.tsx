export default function LoadingSpinner() {
    return (
        // <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex flex-col items-center justify-center">
        //     <div className="h-12 w-12 border-4 mb-3 border-t-pink-500 border-r-transparent border-b-pink-500 border-l-transparent rounded-full animate-spin"></div>
        //     <p className="text-white text-sm font-medium animate-pulse">Wait the Minute...</p>
        // </div>
        <div className="fixed inset-0 z-50 bg-[rgba(128,128,128,0.2)] backdrop-blur-sm flex flex-col items-center justify-center">
            <div className="h-12 w-12 border-4 mb-3 border-t-pink-500 border-r-transparent border-b-pink-500 border-l-transparent rounded-full animate-spin"></div>
            <p className="text-black text-sm font-bold animate-pulse">Wait the Minute...</p>
        </div>

    );
};
