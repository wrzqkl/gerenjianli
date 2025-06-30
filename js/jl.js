 // 侧边导航栏功能
 const sidebar = document.getElementById('sidebar');
 const navToggle = document.getElementById('nav-toggle');
 const closeSidebar = document.getElementById('close-sidebar');
 const overlay = document.getElementById('overlay');
 const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
 
 // 深色模式切换功能
 const themeToggle = document.getElementById('theme-toggle');
 const themeSwitch = document.getElementById('theme-switch');
 const htmlElement = document.documentElement;
 const themeIcon = document.querySelector('.theme-icon i');
 
 // 检查本地存储中的主题偏好
 const isDarkMode = localStorage.getItem('darkMode') === 'true';
 if (isDarkMode) {
   htmlElement.classList.add('dark-mode');
   themeSwitch.checked = true;
   themeIcon.classList.remove('fa-moon');
   themeIcon.classList.add('fa-sun');
 }
 
 // 侧边栏功能
 function openSidebar() {
   sidebar.classList.add('active');
   setTimeout(() => {
     overlay.style.opacity = '1';
   }, 10);
 }
 
 function closeSidebarFunc() {
   sidebar.classList.remove('active');
   overlay.style.opacity = '0';
   setTimeout(() => {
     overlay.style.display = 'none';
   }, 300);
 }
 
 navToggle.addEventListener('click', openSidebar);
 closeSidebar.addEventListener('click', closeSidebarFunc);
 overlay.addEventListener('click', closeSidebarFunc);
 
 sidebarLinks.forEach(link => {
   link.addEventListener('click', () => {
     closeSidebarFunc();
     
     const targetId = link.getAttribute('href');
     const targetElement = document.querySelector(targetId);
     
     if (targetElement) {
       setTimeout(() => {
         targetElement.scrollIntoView({
           behavior: 'smooth'
         });
       }, 300);
     }
   });
 });
 
 // 深色模式切换
 function toggleDarkMode() {
   htmlElement.classList.toggle('dark-mode');
   const isDark = htmlElement.classList.contains('dark-mode');
   
   // 更新图标
   if (isDark) {
     themeIcon.classList.remove('fa-moon');
     themeIcon.classList.add('fa-sun');
   } else {
     themeIcon.classList.remove('fa-sun');
     themeIcon.classList.add('fa-moon');
   }
   
   // 保存主题偏好到本地存储
   localStorage.setItem('darkMode', isDark);
 }
 
 themeToggle.addEventListener('click', toggleDarkMode);
 themeSwitch.addEventListener('change', toggleDarkMode);

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

// 自动播放轮播图
let autoplayInterval;

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    nextSlide();
  }, 3000); // 每3秒切换一次
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// 在页面加载时启动自动播放
window.addEventListener('load', () => {
  startAutoplay();
  // 当鼠标悬停在轮播图上时停止自动播放，离开时恢复
  const carousel = document.querySelector('.hobby-carousel');
  carousel.addEventListener('mouseenter', stopAutoplay);
  carousel.addEventListener('mouseleave', startAutoplay);
});



document.addEventListener('DOMContentLoaded', function() {
  // 动态加载Chart.js
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
  script.onload = initSkillsChart;
  document.head.appendChild(script);
  
  function initSkillsChart() {
    const ctx = document.getElementById('skillsRadarChart');
    if (!ctx) return;
    
    new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['HTML/CSS', 'JavaScript', 'Python', 'C语言', '设计能力', '团队协作'],
        datasets: [{
          label: '技能评估',
          data: [95, 90, 85, 80, 75, 85], // 对应技能值
          backgroundColor: 'rgba(52, 152, 219, 0.5)',
          borderColor: 'rgba(52, 152, 219, 1)',
          pointBackgroundColor: 'rgba(52, 152, 219, 1)',
          pointBorderColor: '#fff',
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(52, 152, 219, 1)',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            angleLines: {
              display: true,
              color: 'rgba(200, 200, 200, 0.3)'
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
              backdropColor: 'transparent'
            },
            pointLabels: {
              font: {
                size: 14,
                family: '"微软雅黑", sans-serif'
              },
              color: function(context) {
                return context.index % 2 === 0 ? '#3498db' : '#2980b9';
              }
            }
          }
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return context.dataset.label + ': ' + context.raw + '%';
              }
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    });
  }
});

// 添加JavaScript控制动画
document.addEventListener('DOMContentLoaded', function() {
  const radarChart = document.getElementById('radarChart');
  let hasAnimated = false;

  radarChart.addEventListener('mouseenter', function() {
    if (!hasAnimated) {
      this.classList.add('animate');
      hasAnimated = true;
      
      // 动画结束后移除类，以便可以再次触发
      setTimeout(() => {
        this.classList.remove('animate');
      }, 1500);
    }
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // 监听滚动事件，触发时间线动画
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  function checkVisible() {
    timelineItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          item.classList.add('visible');
        } else {
          item.classList.remove('visible');
        }
    });
  }
  
  // 初始检查
  checkVisible();
  
  // 滚动时检查
  window.addEventListener('scroll', checkVisible);
  window.addEventListener('load', checkVisibility);
});

// 表单提交
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert('感谢您的留言！我会尽快回复您。');
  contactForm.reset();
});

// 返回顶部按钮
const backToTopButton = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
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
  if (chatContainer.style.display === 'flex') {
    messageInput.focus();
  }
});

closeChat.addEventListener('click', () => {
  chatContainer.style.display = 'none';
});

// 发送消息
async function sendUserMessage() {
  const message = messageInput.value.trim();
  if (!message) return;

  // 添加用户消息
  addMessage(message, 'user');
  messageInput.value = '';
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // 显示"正在输入"指示器
  const typingIndicator = addTypingIndicator();
  
  try {
    // 尝试调用AI API
    let aiResponse = await getAIResponse(message);
    
    // 如果API返回空响应，使用备用回复
    if (!aiResponse || aiResponse.trim() === '') {
      aiResponse = getFallbackResponse(message);
    }
    
    chatMessages.removeChild(typingIndicator);
    addMessage(aiResponse, 'bot');
  } catch (error) {
    chatMessages.removeChild(typingIndicator);
    const fallbackResponse = getFallbackResponse(message);
    addMessage(fallbackResponse, 'bot');
    console.error('AI请求失败:', error);
  }
  
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 添加消息到聊天窗口
function addMessage(content, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}-message`;
  
  const avatarImg = sender === 'user' ? './img/用户头像.jpg' : './img/机器人头像.jpg';
  const avatarAlt = sender === 'user' ? '用户头像' : '机器人头像';
  
  message.innerHTML = sender === 'user' 
    ? `
      <div class="message-content">${content}</div>
      <div class="message-avatar">
        <img src="${avatarImg}" alt="${avatarAlt}">
      </div>
    `
    : `
      <div class="message-avatar">
        <img src="${avatarImg}" alt="${avatarAlt}">
      </div>
      <div class="message-content">${content}</div>
    `;
  
  chatMessages.appendChild(message);
}

// 添加"正在输入"指示器
function addTypingIndicator() {
  const typing = document.createElement('div');
  typing.className = 'message bot-message typing-indicator';
  typing.innerHTML = `
    <div class="message-avatar">
      <img src="./img/机器人头像.jpg" alt="机器人头像">
    </div>
    <div class="message-content">
      <span class="dot"></span>
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
  `;
  chatMessages.appendChild(typing);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typing;
}

// 调用AI API获取回复 - 实际使用时替换为您的API端点
async function getAIResponse(message) {
  try {
    // 示例API调用 - 替换为您的实际API
    const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1';
    
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'package/json',
        'Authorization': 'sk-e1c7036f643f439e9b223fcb41fa3649'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: '你是一个有帮助的AI助手。回答要简洁专业。' },
          { role: 'user', content: message }
        ],
        temperature: 0.7,
        max_tokens: 150
      }),
      timeout: 10000 // 10秒超时
    });

    if (!response.ok) {
      throw new Error(`API请求失败: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('AI API调用失败:', error);
    throw error; // 抛出错误以便外层处理
  }
}

// 备用回复系统
function getFallbackResponse(message) {
  const lowerMsg = message.toLowerCase();
  
  // 根据常见问题提供智能回复
  if (/你好|hi|hello|嗨/.test(lowerMsg)) {
    return '您好！我是AI助手，请问有什么可以帮您？';
  }
  if (/谢谢|感谢|thx/i.test(lowerMsg)) {
    return '不客气，很高兴能帮到您！';
  }
  if (/再见|拜拜|bye/i.test(lowerMsg)) {
    return '再见！如有需要随时找我。';
  }
  if (/帮助|help|支持/i.test(lowerMsg)) {
    return '我可以回答各种问题，提供信息咨询，或者帮您解决技术问题。请具体说明您的需求。';
  }
  
  // 通用回复
  const fallbacks = [
    '我理解您的问题了，但暂时无法连接到AI服务。您可以尝试稍后再问。',
    '这个问题很有意思，不过我需要更多上下文才能给出准确回答。',
    '感谢您的提问，建议您换种方式描述您的问题。',
    '我正在学习回答这类问题，目前还不能完美解答。'
  ];
  
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// 事件监听
sendMessage.addEventListener('click', sendUserMessage);

// 按Enter键发送消息
messageInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendUserMessage();
  }
});