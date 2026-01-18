import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { AppState } from 'react-native';

let player: AudioPlayer | null = null;
let started = false;
let subscription: { remove: () => void } | null = null;

const handleAppStateChange = (nextAppState: string) => {
  if (!player || !started) return;

  if (nextAppState === 'background') {
    player.pause();
  } else if (nextAppState === 'active') {
    player.play();
  }
};

export const playBackgroundMusic = async () => {
  try {
    if (started) return;

    // Set audio mode - disable background playback
    await setAudioModeAsync({
      playsInSilentMode: true,
      shouldPlayInBackground: false,
    });

    // Create audio player
    player = createAudioPlayer(require('../assets/musics/background.mp3'));

    // Configure looping and volume
    player.loop = true;
    player.volume = 0.7;

    // Start playback
    player.play();
    started = true;

    // Add AppState listener to pause/resume on app focus changes
    subscription = AppState.addEventListener('change', handleAppStateChange);
  } catch (e) {
    console.log('Error playing background music:', e);
  }
};

export const stopBackgroundMusic = () => {
  try {
    if (!player) return;

    player.pause(); // stop playback
    player.remove(); // release resources
    player = null;
    started = false;

    // Remove AppState listener
    if (subscription) {
      subscription.remove();
      subscription = null;
    }
  } catch (e) {
    console.log('Error stopping background music:', e);
  }
};
