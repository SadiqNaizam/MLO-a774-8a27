import React, { useState } from 'react';
import { useParams } from 'react-router-dom'; // To get :type and :id
import Sidebar from '@/components/layout/Sidebar';
import SongRow from '@/components/SongRow';
import MediaPlaybackBar from '@/components/MediaPlaybackBar';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from "@/components/ui/context-menu";
import { PlayCircle, Shuffle, Heart, PlusCircle as PlusCircleIcon } from 'lucide-react'; // Renamed to avoid conflict

// Placeholder Data - in a real app, this would be fetched based on params
const contentData = {
  album: {
    album1: {
      title: "Doraemon's Future Funk",
      artist: 'Future Gadget Lab',
      imageUrl: 'https://picsum.photos/seed/doraemon_album1_detail/400/400',
      type: 'Album',
      tracks: [
        { id: 't1', title: 'Anywhere Door Groove', artist: 'Future Gadget Lab', album: "Doraemon's Future Funk", duration: '3:05', albumArtUrl: 'https://picsum.photos/seed/doraemon_album1_detail/60/60' },
        { id: 't2', title: 'Time Kerchief Twist', artist: 'Future Gadget Lab', album: "Doraemon's Future Funk", duration: '2:50', albumArtUrl: 'https://picsum.photos/seed/doraemon_album1_detail/60/60' },
        { id: 't3', title: 'Memory Bread Beat', artist: 'Future Gadget Lab', album: "Doraemon's Future Funk", duration: '4:15', albumArtUrl: 'https://picsum.photos/seed/doraemon_album1_detail/60/60' },
      ]
    }
  },
  playlist: {
    playlist1: {
      title: 'Nobita Naps Mix',
      creator: 'User123',
      imageUrl: 'https://picsum.photos/seed/nobita_playlist1_detail/400/400',
      type: 'Playlist',
      tracks: [
        { id: 't4', title: 'Dreamy Cloud Hop', artist: 'LoFi Noby', album: 'Naptime Beats', duration: '3:22', albumArtUrl: 'https://picsum.photos/seed/nobita_playlist1_detail/60/60' },
        { id: 't5', title: 'Lazy Afternoon Vibe', artist: 'Chill Cat', duration: '2:58', albumArtUrl: 'https://picsum.photos/seed/nobita_playlist1_detail/60/60' },
      ]
    }
  }
  // Add artist details if needed
};

const ContentDetailPage = () => {
  const { type, id } = useParams<{ type: 'album' | 'playlist' | 'artist', id: string }>();
  console.log(`ContentDetailPage loaded for ${type}/${id}`);

  const [currentTrack, setCurrentTrack] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // @ts-ignore -  For simplicity, direct access. In real app, fetch and validate.
  const Sdata = type && id && contentData[type] && contentData[type][id]
    ? contentData[type][id]
    : null;

  if (!Sdata) {
    return (
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <p>Content not found. Maybe it's in Doraemon's 4D pocket?</p>
        </div>
      </div>
    );
  }
  
  const tracks = Sdata.tracks || [];


  const handlePlayPauseSong = (songId: string) => {
    const song = tracks.find((s:any) => s.id === songId);
    if (song) {
      setCurrentTrack({
        id: song.id,
        title: song.title,
        artist: song.artist,
        albumArtUrl: song.albumArtUrl || Sdata.imageUrl,
        durationSeconds: 200 // Placeholder
      });
      setIsPlaying(prev => (currentTrack?.id === songId ? !prev : true));
    }
  };
  
  const handlePlayAll = () => {
    if (tracks.length > 0) {
        handlePlayPauseSong(tracks[0].id);
    }
    console.log("Play All clicked for:", Sdata.title);
  };

  const handleShufflePlay = () => {
    if (tracks.length > 0) {
        const randomIndex = Math.floor(Math.random() * tracks.length);
        handlePlayPauseSong(tracks[randomIndex].id);
    }
    console.log("Shuffle Play clicked for:", Sdata.title);
  };


  return (
    <div className="flex h-screen bg-background text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <ScrollArea className="flex-1">
          <header className="p-8 flex flex-col md:flex-row items-center md:items-end gap-6 bg-gradient-to-b from-blue-700/30 via-card to-card">
            <ContextMenuTrigger>
              <img
                src={Sdata.imageUrl || 'https://picsum.photos/seed/default_content/200/200'}
                alt={Sdata.title}
                className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-md shadow-2xl"
              />
            </ContextMenuTrigger>
             <ContextMenuContent>
                <ContextMenuItem>View Artist (dummy)</ContextMenuItem>
                <ContextMenuItem>Go to Album (dummy)</ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuItem>Share (dummy)</ContextMenuItem>
            </ContextMenuContent>

            <div className="flex-grow text-center md:text-left">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{Sdata.type}</p>
              <h1 className="text-4xl md:text-6xl font-bold my-2 break-words" style={{ color: '#00A0E9' /* Doraemon Blue */ }}>{Sdata.title}</h1>
              <p className="text-muted-foreground text-sm">
                Created by: <span className="font-medium text-foreground">{Sdata.artist || Sdata.creator || 'Unknown Creator'}</span>
              </p>
              <p className="text-muted-foreground text-xs mt-1">{tracks.length} songs</p>
              <div className="mt-6 flex gap-3 justify-center md:justify-start">
                <Button size="lg" onClick={handlePlayAll} className="bg-green-500 hover:bg-green-600 text-white">
                  <PlayCircle className="mr-2 h-5 w-5" /> Play All
                </Button>
                <Button size="lg" variant="outline" onClick={handleShufflePlay}>
                  <Shuffle className="mr-2 h-5 w-5" /> Shuffle
                </Button>
                <Button size="lg" variant="ghost" className="text-muted-foreground hover:text-pink-500">
                    <Heart className="mr-2 h-5 w-5" /> Like
                </Button>
              </div>
            </div>
          </header>

          <div className="p-2 md:p-6">
            {tracks.length > 0 ? (
              <div className="space-y-1">
                {tracks.map((song: any, index: number) => (
                   <ContextMenuTrigger key={song.id}>
                    <SongRow
                      song={{ ...song, album: Sdata.title }}
                      onPlayPauseClick={() => handlePlayPauseSong(song.id)}
                      isPlaying={currentTrack?.id === song.id && isPlaying}
                      isCurrent={currentTrack?.id === song.id}
                      // onLikeClick, onAddToQueueClick can be added here
                    />
                    <ContextMenuContent>
                        <ContextMenuItem onClick={() => handlePlayPauseSong(song.id)}>
                            {currentTrack?.id === song.id && isPlaying ? 'Pause' : 'Play'}
                        </ContextMenuItem>
                        <ContextMenuItem>Add to Queue</ContextMenuItem>
                        <ContextMenuItem>Add to Playlist <PlusCircleIcon className="ml-auto h-4 w-4" /></ContextMenuItem>
                        <ContextMenuItem>Like Song <Heart className="ml-auto h-4 w-4" /></ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem>View Artist</ContextMenuItem>
                        <ContextMenuItem>Go to Album</ContextMenuItem>
                    </ContextMenuContent>
                   </ContextMenuTrigger>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">This {Sdata.type.toLowerCase()} seems to be empty. Maybe Doraemon took all the songs with his "Borrowing Gadget"?</p>
            )}
          </div>
        </ScrollArea>
        <MediaPlaybackBar
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onPlayPause={() => setIsPlaying(!isPlaying)}
            onSkipNext={() => console.log('Skip Next')}
            onSkipPrevious={() => console.log('Skip Previous')}
            onSeek={(time) => console.log('Seek to', time)}
            onVolumeChange={(vol) => console.log('Volume to', vol)}
        />
      </div>
    </div>
  );
};

export default ContentDetailPage;