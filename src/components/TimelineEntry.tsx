interface TimelineEntryProps {
    title: string
    company?: string
    dates: string
    description?: string
    isCompact: boolean
    isLifeEvent?: boolean
}

export function TimelineEntry({
    title,
    company,
    dates,
    description,
    isCompact,
    isLifeEvent
}: TimelineEntryProps) {
    if (isLifeEvent) {
        return (
            <div className="mb-6 bg-tertiary/5 p-3 rounded-lg w-fit ml-auto">
                <h3 className="font-semibold text-secondary">{title}</h3>
                <p className="text-xs">{dates}</p>
            </div>
        )
    }

    return (
        <div className="mb-6">
            <h3 className="font-semibold">{title}</h3>
            <p className="text-xs">{company} | {dates}</p>
            <div className={`overflow-hidden transition-all duration-400 ease-in-out ${isCompact ? 'max-h-0' : 'max-h-20'}`}>
                {description && (
                    <p className="text-xs mt-1">{description}</p>
                )}
            </div>
        </div>
    )
} 