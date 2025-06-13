// 移动端导航菜单切换
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-bar ul');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    // 获取目标ID
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
        
    if (targetElement) {
      // 滚动到目标位置
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// 轮播图功能
document.addEventListener('DOMContentLoaded', function() {
  // 动态加载Font Awesome图标
  const faScript = document.createElement('script');
  faScript.src = 'https://kit.fontawesome.com/a076d05399.js';
  faScript.crossOrigin = 'anonymous';
  document.head.appendChild(faScript);
  
  // 获取所有轮播图容器
  const carousels = document.querySelectorAll('.hobby-carousel');
  
  // 初始化每个轮播图
  carousels.forEach(carousel => {
    const hobby = carousel.dataset.hobby;
    const slidesContainer = document.getElementById(`${hobby}-slides`);
    const slides = slidesContainer.querySelectorAll('.carousel-slide');
    const indicators = document.querySelectorAll(`#${hobby}-indicators .indicator`);
    const prevButton = carousel.querySelector('.carousel-control.prev');
    const nextButton = carousel.querySelector('.carousel-control.next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // 更新轮播图位置和指示器
    function updateCarousel() {
      slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
      
      indicators.forEach((indicator, index) => {
        if (index === currentSlide) {
          indicator.classList.add('active');
        } else {
          indicator.classList.remove('active');
        }
      });
    }
    
    // 下一张幻灯片
    function nextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateCarousel();
    }
    
    // 上一张幻灯片
    function prevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateCarousel();
    }
    
    // 指示器点击事件
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        currentSlide = parseInt(indicator.dataset.slide);
        updateCarousel();
      });
    });
    
    // 控制按钮点击事件
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
    
    // 设置自动播放
    let autoplayInterval = setInterval(nextSlide, 5000);
    
    // 鼠标悬停暂停自动播放
    carousel.addEventListener('mouseenter', () => {
      clearInterval(autoplayInterval);
    });
    
    // 鼠标离开恢复自动播放
    carousel.addEventListener('mouseleave', () => {
      autoplayInterval = setInterval(nextSlide, 5000);
    });
  });
});

// 表单提交
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('感谢您的留言！我会尽快回复您。');
  contactForm.reset();
});

// 返回顶部按钮
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// 深色/浅色模式切换
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  if (body.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '浅色模式';
  } else {
    darkModeToggle.textContent = '深色模式';
  }
});

// 聊天机器人功能
const chatButton = document.getElementById('chat-button');
const chatContainer = document.getElementById('chat-container');
const closeChat = document.getElementById('close-chat');
const messageInput = document.getElementById('message-input');
const sendMessage = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');

// 打开/关闭聊天窗口
chatButton.addEventListener('click', () => {
  chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
  // 打开聊天窗口时自动聚焦输入框
  if (chatContainer.style.display === 'flex') {
    messageInput.focus();
  }
});

closeChat.addEventListener('click', () => {
  chatContainer.style.display = 'none';
});

// 发送消息
function sendUserMessage() {
  const message = messageInput.value.trim();
  if (message) {
    // 添加用户消息
    const userMessage = document.createElement('div');
    userMessage.className = 'message user-message';
    userMessage.innerHTML = `
      <div class="message-content">${message}</div>
      <div class="message-avatar">
        <img src="./img/用户头像.jpg" alt="用户头像">
      </div>
    `;
    chatMessages.appendChild(userMessage);

    // 清空输入框
    messageInput.value = '';

    // 滚动到底部
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // 模拟机器人回复
    setTimeout(() => {
      let botResponse = '我不太理解您的问题。您可以尝试换一种表达方式，或者问我一些其他问题。';
      
      // 根据用户消息内容提供不同的回复
      if (message.toLowerCase().includes('你好') || message.toLowerCase().includes('hi')) {
        botResponse = '你好！很高兴为您服务。有什么我可以帮助您的吗？';
      } else if (message.toLowerCase().includes('技能') || message.toLowerCase().includes('能力')) {
        botResponse = '您可以在"专业技能"部分查看我的技能详情，包括HTML/CSS、JavaScript、React和Vue.js等。';
      } else if (message.toLowerCase().includes('项目') || message.toLowerCase().includes('作品')) {
        botResponse = '您可以在"项目经验"部分查看我的作品集，包括电子商务网站、任务管理应用和个人博客系统等。';
      } else if (message.toLowerCase().includes('联系') || message.toLowerCase().includes('email')) {
        botResponse = '您可以通过"联系我"部分的表单给我发送消息，我会尽快回复您。';
      }

      const botMessage = document.createElement('div');
      botMessage.className = 'message bot-message';
      botMessage.innerHTML = `
        <div class="message-avatar">
          <img src="./img/机器人头像.jpg" alt="机器人头像">
        </div>
        <div class="message-content">${botResponse}</div>
      `;
      chatMessages.appendChild(botMessage);
      
      // 滚动到底部
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 800);
  }
}

sendMessage.addEventListener('click', sendUserMessage);

// 按Enter键发送消息
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendUserMessage();
  }
});