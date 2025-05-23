export function extraCredits(duration: number) {
    if (duration <= 6) return 0
    if (duration <= 15) return 3
    if (duration <= 25) return 4
    if (duration <= 33) return 5
    if (duration <= 43) return 7
    return 10         // 44-60
  }
  