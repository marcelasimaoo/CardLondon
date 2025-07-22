document.addEventListener("DOMContentLoaded", () => {
  const loveButton = document.getElementById("loveButton")
  const hiddenMessage = document.getElementById("hiddenMessage")
  const missYouCloud = document.getElementById("missYouCloud")
  const cloudMessage = document.getElementById("cloudMessage")

  let messageRevealed = false

  // Função para o botão de amor
  loveButton.addEventListener("click", () => {
    if (!messageRevealed) {
      // Primeira vez clicando
      hiddenMessage.classList.add("show")
      loveButton.querySelector(".button-text").textContent = "Te amo muito! 💖"
      messageRevealed = true

      // Adiciona efeito de confete de corações
      createHeartConfetti()

      // Vibração no celular (se suportado)
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200])
      }
    } else {
      // Cliques subsequentes - efeito especial
      createHeartBurst()

      // Alterna entre mensagens fofas
      const messages = [
        "Te amo muito! 💖",
        "Você é meu mundo! 🌍",
        "Saudades infinitas! 💕",
        "Meu coração é seu! ❤️",
        "Volta logo pra mim! 🥺",
      ]

      const randomMessage = messages[Math.floor(Math.random() * messages.length)]
      loveButton.querySelector(".button-text").textContent = randomMessage
    }

    // Efeito de pulso no botão
    loveButton.style.animation = "none"
    setTimeout(() => {
      loveButton.style.animation = ""
    }, 10)
  })

  // Função para criar confete de corações
  function createHeartConfetti() {
    const hearts = ["💖", "💕", "💗", "💝", "❤️", "💘"]

    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const heart = document.createElement("div")
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)]
        heart.style.position = "fixed"
        heart.style.left = Math.random() * window.innerWidth + "px"
        heart.style.top = "-50px"
        heart.style.fontSize = Math.random() * 20 + 15 + "px"
        heart.style.pointerEvents = "none"
        heart.style.zIndex = "1000"
        heart.style.animation = `heartFall ${Math.random() * 2 + 3}s linear forwards`

        document.body.appendChild(heart)

        setTimeout(() => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart)
          }
        }, 5000)
      }, i * 100)
    }
  }

  // Função para criar explosão de corações
  function createHeartBurst() {
    const buttonRect = loveButton.getBoundingClientRect()
    const centerX = buttonRect.left + buttonRect.width / 2
    const centerY = buttonRect.top + buttonRect.height / 2

    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("div")
      heart.textContent = "💖"
      heart.style.position = "fixed"
      heart.style.left = centerX + "px"
      heart.style.top = centerY + "px"
      heart.style.fontSize = "20px"
      heart.style.pointerEvents = "none"
      heart.style.zIndex = "1000"
      heart.style.transform = "translate(-50%, -50%)"

      const angle = (i / 8) * Math.PI * 2
      const distance = 100
      const endX = Math.cos(angle) * distance
      const endY = Math.sin(angle) * distance

      heart.style.animation = `heartBurst 1s ease-out forwards`
      heart.style.setProperty("--endX", endX + "px")
      heart.style.setProperty("--endY", endY + "px")

      document.body.appendChild(heart)

      setTimeout(() => {
        if (heart.parentNode) {
          heart.parentNode.removeChild(heart)
        }
      }, 1000)
    }
  }

  // Adiciona as animações CSS dinamicamente
  const style = document.createElement("style")
  style.textContent = `
        @keyframes heartFall {
            to {
                transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
        
        @keyframes heartBurst {
            to {
                transform: translate(calc(-50% + var(--endX)), calc(-50% + var(--endY))) scale(0);
                opacity: 0;
            }
        }
    `
  document.head.appendChild(style)

  // Efeito especial na nuvem interativa
  missYouCloud.addEventListener("click", () => {
    // Cria um efeito de lágrimas
    createTearEffect()

    // Vibração suave
    if (navigator.vibrate) {
      navigator.vibrate(300)
    }
  })

  function createTearEffect() {
    const cloudRect = missYouCloud.getBoundingClientRect()
    const centerX = cloudRect.left + cloudRect.width / 2
    const centerY = cloudRect.bottom

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const tear = document.createElement("div")
        tear.textContent = "💧"
        tear.style.position = "fixed"
        tear.style.left = centerX + (Math.random() - 0.5) * 20 + "px"
        tear.style.top = centerY + "px"
        tear.style.fontSize = "16px"
        tear.style.pointerEvents = "none"
        tear.style.zIndex = "1000"
        tear.style.animation = "tearDrop 2s ease-in forwards"

        document.body.appendChild(tear)

        setTimeout(() => {
          if (tear.parentNode) {
            tear.parentNode.removeChild(tear)
          }
        }, 2000)
      }, i * 200)
    }
  }

  // Adiciona animação de lágrima
  style.textContent += `
        @keyframes tearDrop {
            to {
                transform: translateY(200px);
                opacity: 0;
            }
        }
    `

  // Efeito de entrada suave
  setTimeout(() => {
    document.querySelector(".card").style.opacity = "0"
    document.querySelector(".card").style.transform = "translateY(50px) scale(0.9)"
    document.querySelector(".card").style.transition = "all 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55)"

    setTimeout(() => {
      document.querySelector(".card").style.opacity = "1"
      document.querySelector(".card").style.transform = "translateY(0) scale(1)"
    }, 100)
  }, 100)
})
