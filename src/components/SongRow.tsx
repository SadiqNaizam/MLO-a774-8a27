import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Play, Pause, Heart, Download } from 'lucide-react'; // Example icons
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils"; // For conditional class names

interface Song {
  id: string;
  title: string;
  artist: string;
  album?: string;
  duration: string; // e.g., "3:45"
  albumArtUrl?: string;
}

interface SongRowProps {
  song: Song;
  isPlaying?: boolean; // Is this song currently playing?
  isCurrent?: boolean; // Is this the current song in the playback bar (even if paused)?
  onPlayPauseClick: (songId: string) => void;
  onLikeClick?: (songId: string) => void;
  onAddToQueueClick?: (songId: string) => void;
  // Add more actions as needed
}

const SongRow: React.FC<SongRowProps> = ({
  song,
  isPlaying,
  isCurrent,
  onPlayPauseClick,
  onLikeClick,
  onAddToQueueClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  console.log(`Rendering SongRow: ${song.title}, isPlaying: ${isPlaying}, isCurrent: ${isCurrent}`);

  const handlePlayPause = () => {
    console.log(`Play/Pause clicked for song: ${song.title}`);
    onPlayPauseClick(song.id);
  };

  const rowClasses = cn(
    "flex items-center p-2 rounded-md group hover:bg-muted/50 transition-colors",
    isCurrent && "bg-muted" // Highlight if current song
    // Doraemon theme: hover:bg-blue-100 or similar
  );

  return (
    <div
      className={rowClasses}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-3 w-12 justify-center">
        {(isHovered || isPlaying) ? (
          <Button variant="ghost" size="icon" onClick={handlePlayPause} className="h-8 w-8">
            {isPlaying ? <Pause size={18} className="text-primary" /> : <Play size={18} />}
          </Button>
        ) : (
          <span className="text-sm text-muted-foreground w-4 text-center">
            {/* Placeholder for track number, or show play icon on hover for non-current tracks */}
            {isCurrent ? (isPlaying ? <Pause size={18} className="text-primary"/> : <Play size={18} className="text-primary"/>) : '•'}
          </span>
        )}
      </div>

      {song.albumArtUrl && (
        <img
          src={song.albumArtUrl || '/placeholder.svg'}
          alt={song.album || song.title}
          className="w-10 h-10 rounded object-cover mr-3"
          onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
        />
      )}

      <div className="flex-grow">
        <p className={`font-medium truncate ${isCurrent ? 'text-primary' : 'text-foreground'}`}>
          {song.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">{song.artist}</p>
      </div>

      {song.album && (
        <div className="w-1/4 hidden md:block">
          <p className="text-sm text-muted-foreground truncate">{song.album}</p>
        </div>
      )}
      
      <div className="w-16 text-right text-sm text-muted-foreground mr-3 hidden sm:block">
        {onLikeClick && isHovered && (
            <Button variant="ghost" size="icon" onClick={() => onLikeClick(song.id)} className="text-muted-foreground hover:text-pink-500">
                <Heart size={16} />
            </Button>
        )}
      </div>

      <div className="w-16 text-right text-sm text-muted-foreground">{song.duration}</div>

      <div className="w-12 flex justify-center">
        {(isHovered || isCurrent) && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                <MoreHorizontal size={18} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {onLikeClick && <DropdownMenuItem onClick={() => onLikeClick(song.id)}><Heart size={16} className="mr-2" /> Like Song</DropdownMenuItem>}
              {onAddToQueueClick && <DropdownMenuItem onClick={() => onAddToQueueClick(song.id)}>Add to Queue</DropdownMenuItem>}
              <DropdownMenuSeparator />
              <DropdownMenuItem><Download size={16} className="mr-2" /> Download (placeholder)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default SongRow;