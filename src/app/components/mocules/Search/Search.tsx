type Props = {
    value: string;
    onChange: (value: string) => void;
};

export function Search({ value, onChange }: Props) {
    return (
        <div className="w-full px-2 py-4 border-b-4 border-foreground bg-background">
            <input
                type="text"
                placeholder="SEARCH NOTES..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-4 font-mono text-xl font-bold bg-background text-foreground border-4 border-foreground outline-none
                   focus:ring-4 focus:ring-accent focus:border-accent transition-all placeholder:text-foreground/50 uppercase"
            />
        </div>
    );
}
