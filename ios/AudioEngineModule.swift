import Foundation
import AVFoundation
import MediaPlayer
import UIKit
import React

@objc(AudioEngineModule)
class AudioEngineModule: NSObject {

  static let shared = AudioEngineModule()

  private var player: AVPlayer?
  private var currentItem: AVPlayerItem?

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override init() {
    super.init()
    setupAudioSession()
    setupRemoteCommands()
  }

  private func setupAudioSession() {
    let session = AVAudioSession.sharedInstance()
    try? session.setCategory(.playback, mode: .default)
    try? session.setActive(true)
  }

  private func setupRemoteCommands() {
    let cc = MPRemoteCommandCenter.shared()

    cc.playCommand.addTarget { _ in
      self.play()
      return .success
    }

    cc.pauseCommand.addTarget { _ in
      self.pause()
      return .success
    }
  }

  // 🔥 LOAD + ARTWORK
  @objc
  func load(_ uri: String,
            title: String,
            artist: String,
            artwork: String) {

    let url = URL(string: uri)!
    let item = AVPlayerItem(url: url)

    self.currentItem = item
    self.player = AVPlayer(playerItem: item)

    setupNowPlaying(
      title: title,
      artist: artist,
      artworkUrl: artwork
    )
  }

  @objc
  func play() {
    player?.play()
    updateRate(1)
  }

  @objc
  func pause() {
    player?.pause()
    updateRate(0)
  }

  // MARK: - Now Playing

  private func setupNowPlaying(
    title: String,
    artist: String,
    artworkUrl: String
  ) {

    var info: [String: Any] = [
      MPMediaItemPropertyTitle: title,
      MPMediaItemPropertyArtist: artist,
      MPNowPlayingInfoPropertyPlaybackRate: 1.0
    ]

    MPNowPlayingInfoCenter.default().nowPlayingInfo = info

    // 🎨 LOAD ARTWORK ASYNC
    guard let url = URL(string: artworkUrl) else { return }

    URLSession.shared.dataTask(with: url) { data, _, _ in
      guard
        let data = data,
        let image = UIImage(data: data)
      else { return }

      let artwork = MPMediaItemArtwork(boundsSize: image.size) { _ in image }

      DispatchQueue.main.async {
        info[MPMediaItemPropertyArtwork] = artwork
        MPNowPlayingInfoCenter.default().nowPlayingInfo = info
      }
    }.resume()
  }

  private func updateRate(_ rate: Float) {
    MPNowPlayingInfoCenter.default().nowPlayingInfo?[MPNowPlayingInfoPropertyPlaybackRate] = rate
  }
}
