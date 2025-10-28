import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface ChatHistory {
  id: number;
  title: string;
  preview: string;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Привет! Я ИИ-агент. Чем могу помочь?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const commands = [
    { icon: 'Sparkles', title: '/start', description: 'Начать новый диалог' },
    { icon: 'HelpCircle', title: '/help', description: 'Показать справку' },
    { icon: 'Settings', title: '/settings', description: 'Настройки бота' },
    { icon: 'Info', title: '/about', description: 'Информация о боте' },
    { icon: 'BookOpen', title: '/guide', description: 'Руководство пользователя' },
    { icon: 'Zap', title: '/quick', description: 'Быстрые действия' },
  ];

  const chatHistory: ChatHistory[] = [
    {
      id: 1,
      title: 'Вопрос о погоде',
      preview: 'Какая погода будет завтра?',
      timestamp: new Date(Date.now() - 86400000),
    },
    {
      id: 2,
      title: 'Помощь с кодом',
      preview: 'Как создать функцию на Python?',
      timestamp: new Date(Date.now() - 172800000),
    },
    {
      id: 3,
      title: 'Рецепт блюда',
      preview: 'Посоветуй рецепт пасты',
      timestamp: new Date(Date.now() - 259200000),
    },
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);
    setInputValue('');

    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: 'Обрабатываю ваш запрос...',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <div className="container max-w-6xl mx-auto p-4 h-screen flex flex-col">
        <header className="py-6 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center">
              <Icon name="Bot" size={28} className="text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">ИИ Агент</h1>
              <p className="text-sm text-muted-foreground">Telegram Bot</p>
            </div>
          </div>
        </header>

        <Tabs defaultValue="chat" className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="chat" className="gap-2">
              <Icon name="MessageSquare" size={18} />
              Чат
            </TabsTrigger>
            <TabsTrigger value="commands" className="gap-2">
              <Icon name="Terminal" size={18} />
              Команды
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Icon name="History" size={18} />
              История
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 flex flex-col mt-0">
            <Card className="flex-1 flex flex-col overflow-hidden">
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      } animate-fade-in`}
                    >
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary text-secondary-foreground'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === 'user'
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('ru-RU', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    placeholder="Напишите сообщение..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon" className="shrink-0">
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="commands" className="flex-1 mt-0">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Доступные команды</h2>
              <div className="grid gap-3">
                {commands.map((command, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon name={command.icon as any} size={20} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{command.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{command.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="flex-1 mt-0">
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">История чатов</h2>
              <div className="space-y-3">
                {chatHistory.map((chat, index) => (
                  <div
                    key={chat.id}
                    className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-medium text-foreground">{chat.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {chat.preview}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground shrink-0">
                        {chat.timestamp.toLocaleDateString('ru-RU', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
