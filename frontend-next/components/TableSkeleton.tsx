export function TableSkeleton() {
    return (
        <>
            {[...Array(5)].map((_, i) => (
                <tr key={i} className="animate-pulse border-b border-white/5">
                    <td className="p-5">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-white/5"></div>
                            <div className="space-y-2">
                                <div className="h-4 w-16 bg-white/5 rounded"></div>
                                <div className="h-3 w-12 bg-white/5 rounded"></div>
                            </div>
                        </div>
                    </td>
                    <td className="p-5">
                        <div className="h-8 w-24 bg-white/5 rounded mx-auto"></div>
                    </td>
                    <td className="p-5 text-right">
                        <div className="h-4 w-20 bg-white/5 rounded ml-auto"></div>
                    </td>
                    <td className="p-5 text-right">
                        <div className="h-4 w-16 bg-white/5 rounded ml-auto"></div>
                    </td>
                    <td className="p-5 text-right">
                        <div className="h-4 w-16 bg-white/5 rounded ml-auto"></div>
                    </td>
                    <td className="p-5 text-right">
                        <div className="h-4 w-16 bg-white/5 rounded ml-auto"></div>
                    </td>
                    <td className="p-5 text-center">
                        <div className="h-8 w-12 bg-white/5 rounded mx-auto"></div>
                    </td>
                    <td className="p-5">
                        <div className="grid grid-cols-2 gap-2 w-40">
                            <div className="h-3 bg-white/5 rounded"></div>
                            <div className="h-3 bg-white/5 rounded"></div>
                            <div className="h-3 bg-white/5 rounded"></div>
                            <div className="h-3 bg-white/5 rounded"></div>
                        </div>
                    </td>
                    <td className="p-5 text-center">
                        <div className="flex gap-2 justify-center">
                            <div className="h-8 w-16 bg-white/5 rounded-lg"></div>
                            <div className="h-8 w-16 bg-white/5 rounded-lg"></div>
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
}
