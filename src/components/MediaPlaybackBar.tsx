import React, { useState, useEffect, useRef } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  Repeat,
  Shuffle,
  ListMusic, // For queue
  Heart,    // For like
} from 'lucide-react';
import { cn } from "@/lib/utils";

interface TrackInfo {
  id: string;
  title: string;
  artist: string;
  albumArtUrl?: string;
  durationSeconds: number; // Total duration in seconds
}

interface MediaPlaybackBarProps {
  currentTrack: TrackInfo | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipNext: () => void;
  onSkipPrevious: () => void;
  onSeek: (timeSeconds: number) => void; // Callback when user seeks
  onVolumeChange: (volume: number) => void; // Volume 0-1
  onToggleRepeat?: () => void;
  onToggleShuffle?: () => void;
  onLikeTrack?: (trackId: string) => void;
  initialVolume?: number; // 0-1
  // Add current time prop if managed externally
  // currentTimeSeconds?: number; 
}

const MediaPlaybackBar: React.FC<MediaPlaybackBarProps> = ({
  currentTrack,
  isPlaying,
  onPlayPause,
  onSkipNext,
  onSkipPrevious,
  onSeek,
  onVolumeChange,
  onToggleRepeat,
  onToggleShuffle,
  onLikeTrack,
  initialVolume = 0.5,
  // currentTimeSeconds: externalCurrentTime,
}) => {
  const [currentTime, setCurrentTime] = useState(0); // Internal for display if not provided
  const [volume, setVolume] = useState(initialVolume * 100); // Slider works with 0-100
  const [isMuted, setIsMuted] = useState(false);
  const [lastVolumeBeforeMute, setLastVolumeBeforeMute] = useState(initialVolume * 100);

  const audioRef = useRef<HTMLAudioElement>(null); // Placeholder for actual audio element if managed here

  console.log(`Rendering MediaPlaybackBar. Track: ${currentTrack?.title}, Playing: ${isPlaying}, Time: ${currentTime}`);

  // This effect simulates internal time progression for display purposes
  // In a real app, currentTime would come from the audio element or a global state
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          if (prevTime < currentTrack.durationSeconds) {
            return prevTime + 1;
          }
          // Auto-skip or stop logic could go here
          clearInterval(interval);
          return currentTrack.durationSeconds;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack]);

  // Reset time if track changes
  useEffect(() => {
    setCurrentTime(0);
  }, [currentTrack?.id]);


  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime); // Update display immediately
    onSeek(newTime);
    console.log(`Seek to: ${newTime}s`);
  };

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    onVolumeChange(newVolume / 100); // Convert to 0-1
    console.log(`Volume changed to: ${newVolume / 100}`);
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(lastVolumeBeforeMute > 0 ? lastVolumeBeforeMute : 50); // Restore or set default
      onVolumeChange((lastVolumeBeforeMute > 0 ? lastVolumeBeforeMute : 50) / 100);
      setIsMuted(false);
    } else {
      setLastVolumeBeforeMute(volume);
      setVolume(0);
      onVolumeChange(0);
      setIsMuted(true);
    }
    console.log(`Mute toggled. Is muted: ${!isMuted}`);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  if (!currentTrack) {
    // Optionally render a minimal bar or nothing if no track
    return (
      <footer className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t h-20 flex items-center justify-center px-4 z-50">
        <p className="text-muted-foreground text-sm">No music playing.</p>
        {/* Doraemon theme: Could have a sleeping Doraemon icon or subtle pattern */}
      </footer>
    );
  }

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t h-[90px] flex items-center px-4 z-50">
      {/* Doraemon theme: Primary color for border-t e.g. border-t-blue-500 */}
      <div className="flex items-center gap-3 w-[25%]">
        {currentTrack.albumArtUrl && (
          <AspectRatio ratio={1/1} className="w-14 h-14 rounded">
            <img
              src={currentTrack.albumArtUrl}
              alt={currentTrack.title}
              className="object-cover w-full h-full rounded"
              onError={(e) => (e.currentTarget.src = '/placeholder.svg')}
            />
          </AspectRatio>
        )}
        <div>
          <p className="text-sm font-medium truncate text-foreground">{currentTrack.title}</p>
          <p className="text-xs text-muted-foreground truncate">{currentTrack.artist}</p>
        </div>
        {onLikeTrack && (
            <Button variant="ghost" size="icon" className="ml-2 text-muted-foreground hover:text-pink-500" onClick={() => onLikeTrack(currentTrack.id)}>
                <Heart size={18} />
            </Button>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-[50%]">
        <div className="flex items-center gap-2 mb-1">
          {onToggleShuffle && <Button variant="ghost" size="icon" onClick={onToggleShuffle} className="text-muted-foreground hover:text-primary"><Shuffle size={18} /></Button>}
          <Button variant="ghost" size="icon" onClick={onSkipPrevious} className="text-foreground"><SkipBack size={20} /></Button>
          <Button
            variant="default"
            size="icon"
            onClick={onPlayPause}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-9 w-9"
            // Doraemon theme: Play button could be red or prominent blue
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </Button>
          <Button variant="ghost" size="icon" onClick={onSkipNext} className="text-foreground"><SkipForward size={20} /></Button>
          {onToggleRepeat && <Button variant="ghost" size="icon" onClick={onToggleRepeat} className="text-muted-foreground hover:text-primary"><Repeat size={18} /></Button>}
        </div>
        <div className="flex items-center gap-2 w-full max-w-md">
          <span className="text-xs text-muted-foreground w-10 text-right">{formatTime(currentTime)}</span>
          <Slider
            defaultValue={[0]}
            value={[currentTime]}
            max={currentTrack.durationSeconds || 100} // Fallback if duration is 0
            step={1}
            onValueChange={handleSeek}
            className={cn("w-full cursor-pointer [&>span:first-child]:h-1 [&>span:first-child>span]:bg-primary")}
            // Doraemon theme: Slider track could be blue, thumb yellow
          />
          <span className="text-xs text-muted-foreground w-10">{formatTime(currentTrack.durationSeconds)}</span>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2 w-[25%]">
        {/* Queue button (placeholder) */}
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
            <ListMusic size={20} />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleMute} className="text-muted-foreground hover:text-primary">
          {isMuted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
        <Slider
          defaultValue={[initialVolume * 100]}
          value={[volume]}
          max={100}
          step={1}
          onValueChange={handleVolumeChange}
          className="w-24 cursor-pointer [&>span:first-child]:h-1"
        />
      </div>
       {/* This is a placeholder for an actual audio element. 
           In a real app, this would be controlled by the component's state/props.
       <audio ref={audioRef} src={currentTrack?.audioSrcUrl} /> 
       */}
    </footer>
  );
};

export default MediaPlaybackBar;