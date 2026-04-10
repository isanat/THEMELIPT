'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Flame,
  Shield,
  Zap,
  TrendingUp,
  ExternalLink,
  ArrowRight,
  CircleDot,
  Lock,
  Coins,
  Wallet,
  ArrowDownLeft,
  BarChart3,
  PieChart,
  ChevronRight,
  Sparkles,
  Menu,
  ArrowUp,
  Timer,
  Activity,
  ArrowRightLeft,
  Users,
  Copy,
  Check,
  Bell,
  Rocket,
  Gift,
  Hexagon,
  ShieldCheck,
  Database,
  Mail,
  CheckCircle2,
  XCircle,
  X,
  Send,
  AlertTriangle,
  Globe,
  MessageCircle,
  ArrowUpCircle,
  Crown,
  Code2,

  Award,
  Blocks,
  Fingerprint,
  BookOpen,
  FileCheck,
  Landmark,
  Cpu,
  Network,
  ChevronUp,
  Settings,
  Clock,
} from 'lucide-react';
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/* ================================================================
   TYPE INTERFACES (used throughout the file)
   ================================================================ */

interface LiveStats {
  marketCap?: string;
  totalBurned?: string;
  holders?: number;
  price?: string;
  circulating?: string;
  totalSupply?: string;
  stakingAPY?: number;
  burnRate?: number;
  volume24h?: string;
  priceChange24h?: number;
  transactions24h?: number;
  liquidityUSD?: string;
  source?: string;
  contractAddress?: string;
}

interface OnChainData {
  network?: {
    blockNumber: number;
    gasPrice: number;
    chainName: string;
    status: string;
  };
  token?: {
    name: string;
    symbol: string;
    totalSupply: string;
    totalBurned: string;
    circulating: string;
    contractAddress: string;
  };
}

/* ================================================================
   USE IN VIEW HOOK
   ================================================================ */

function useInView(ref: React.RefObject<HTMLElement | null>, options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observerOptions = { threshold: 0.1, ...options };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      observerOptions
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, options]);

  return isInView;
}

/* ================================================================
   ANIMATED SECTION WRAPPER
   ================================================================ */

function AnimatedSection({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all duration-700 ease-out",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ================================================================
   TYPING TEXT COMPONENT
   ================================================================ */

function TypingText({ text, className, speed = 50, startDelay = 800 }: { text: string; className?: string; speed?: number; startDelay?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const delayTimer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(delayTimer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayedText(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        setDone(true);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className={cn('inline', className)}>
      {displayedText}
      <span className={cn(
        'inline-block w-[2px] h-[1.1em] bg-ember ml-0.5 align-text-bottom',
        done ? 'animate-[blink-cursor_1s_step-end_infinite]' : 'animate-[blink-cursor_0.6s_step-end_infinite]'
      )} />
    </span>
  );
}

/* ================================================================
   LAUNCH APP DIALOG COMPONENT
   ================================================================ */

function useLaunchDialog() {
  const [open, setOpen] = useState(false);
  return { open, setOpen };
}

function LaunchAppDialogContent({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {

  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, onOpenChange]);

  const wallets = [
    {
      name: 'MetaMask',
      description: 'A wallet mais popular para Ethereum e Polygon',
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
          <rect width="32" height="32" rx="8" fill="#F6851B" fillOpacity="0.15" />
          <path d="M16 6L8 11.5L16 17L24 11.5L16 6Z" fill="#F6851B" />
          <path d="M8 11.5V18.5L16 24V17L8 11.5Z" fill="#E4761B" />
          <path d="M24 11.5V18.5L16 24V17L24 11.5Z" fill="#F6851B" />
          <path d="M8 18.5L16 24V30L8 18.5Z" fill="#E4761B" />
          <path d="M24 18.5L16 24V30L24 18.5Z" fill="#F6851B" />
        </svg>
      ),
      hoverColor: 'hover:border-[#F6851B]/40 hover:shadow-[0_0_20px_rgba(246,133,27,0.15)]',
    },
    {
      name: 'Trust Wallet',
      description: 'Wallet multi-chain segura e intuitiva',
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
          <rect width="32" height="32" rx="8" fill="#0500FF" fillOpacity="0.15" />
          <path d="M16 7C16 7 10 12 10 17C10 22 16 27 16 27C16 27 22 22 22 17C22 12 16 7 16 7Z" fill="#0500FF" />
          <path d="M16 11C16 11 13 14 13 16.5C13 19 16 21 16 21C16 21 19 19 19 16.5C19 14 16 11 16 11Z" fill="#3375BB" />
        </svg>
      ),
      hoverColor: 'hover:border-[#0500FF]/40 hover:shadow-[0_0_20px_rgba(5,0,255,0.15)]',
    },
    {
      name: 'Coinbase Wallet',
      description: 'A wallet da Coinbase, fácil e segura',
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
          <rect width="32" height="32" rx="8" fill="#0052FF" fillOpacity="0.15" />
          <rect x="8" y="13" width="4" height="10" rx="1" fill="#0052FF" />
          <rect x="14" y="9" width="4" height="14" rx="1" fill="#0052FF" />
          <rect x="20" y="11" width="4" height="12" rx="1" fill="#0052FF" />
        </svg>
      ),
      hoverColor: 'hover:border-[#0052FF]/40 hover:shadow-[0_0_20px_rgba(0,82,255,0.15)]',
    },
    {
      name: 'WalletConnect',
      description: 'Conecte qualquer wallet via QR code',
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none">
          <rect width="32" height="32" rx="8" fill="#3B99FC" fillOpacity="0.15" />
          <path d="M10 14C12.5 11.5 16.5 11.5 19 14" stroke="#3B99FC" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M12.5 16.5C14 15 16 15 17.5 16.5" stroke="#3B99FC" strokeWidth="2" strokeLinecap="round" fill="none" />
          <circle cx="15" cy="19" r="1.5" fill="#3B99FC" />
          <path d="M22 14C19.5 11.5 15.5 11.5 13 14" stroke="#3B99FC" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      ),
      hoverColor: 'hover:border-[#3B99FC]/40 hover:shadow-[0_0_20px_rgba(59,153,252,0.15)]',
    },
  ];

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => onOpenChange(false)}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      {/* Modal */}
      <div
        className="relative glass-dark sm:max-w-md w-full rounded-2xl border border-charcoal-lighter/50 bg-charcoal p-0 overflow-hidden shadow-2xl shadow-black/40 animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-ember/15 border border-ember/30 flex items-center justify-center">
                <Flame className="w-5 h-5 text-ember" />
              </div>
              <div>
                <h2 className="text-ash text-xl font-heading font-bold">Conectar Carteira</h2>
                <p className="text-ash-muted mt-0.5 text-sm">
                  Escolha sua wallet para conectar ao LIPT Protocol
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenChange(false)}
              className="w-8 h-8 rounded-lg bg-charcoal-light border border-charcoal-lighter/50 flex items-center justify-center text-ash-muted hover:text-ash hover:bg-charcoal-lighter/50 transition-colors"
              aria-label="Fechar"
            >
              <span className="text-lg leading-none">&times;</span>
            </button>
          </div>
        </div>

        {/* Wallet Options */}
        <div className="px-4 pb-4 space-y-2">
          {wallets.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => onOpenChange(false)}
              className={cn(
                "w-full flex items-center gap-4 p-3.5 rounded-xl bg-charcoal-light/50 border border-charcoal-lighter/50",
                "transition-all duration-300 hover:bg-charcoal-light/80 cursor-pointer",
                wallet.hoverColor
              )}
            >
              <div className="w-10 h-10 rounded-lg bg-charcoal-light border border-charcoal-lighter/50 flex items-center justify-center shrink-0">
                {wallet.icon}
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-semibold text-ash">{wallet.name}</p>
                <p className="text-xs text-ash-muted mt-0.5 truncate">{wallet.description}</p>
              </div>
              <ArrowRight className="w-4 h-4 text-ash-muted shrink-0" />
            </button>
          ))}
        </div>

        {/* Footer Badge */}
        <div className="p-4 pt-0 flex justify-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-charcoal-light/50 border border-charcoal-lighter/30">
            <Hexagon className="w-4 h-4 text-neon" />
            <span className="text-xs text-ash-muted font-medium">Powered by</span>
            <span className="text-xs text-neon font-bold">Polygon</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   PULSING PLUS SUFFIX (for growing stats)
   ================================================================ */

function PulsingPlus() {
  return (
    <span className="inline-block animate-[pulse-plus_2s_ease-in-out_infinite] text-ember font-bold ml-0.5">+</span>
  );
}

/* ================================================================
   LIVE INDICATOR
   ================================================================ */

function LiveIndicator() {
  return (
    <span className="inline-flex items-center gap-1.5 ml-2">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">AO VIVO</span>
    </span>
  );
}

/* ================================================================
   SOCIAL SVG ICONS
   ================================================================ */

function TwitterXIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function TelegramIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function DiscordIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
    </svg>
  );
}

function LinkedinIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ================================================================
   PROTOCOL UPDATES (NOTIFICATION BELL)
   ================================================================ */

function ProtocolUpdates() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updates = [
    { date: "08/04", title: "BurnEngine v2.1 Ativado", desc: "Taxa de queima ajustada para 2%" },
    { date: "05/04", title: "The Vault - Novo APY", desc: "Yield aumentado para 42% ao ano" },
    { date: "01/04", title: "The Forge - Pool #3", desc: "Novo pool de liquidez LIPT/USDT" },
    { date: "28/03", title: "Auditoria Concluída", desc: "Smart contracts auditados pela CertiK" },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative hidden md:block" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-ash-muted hover:text-ember hover:bg-ember/10 inline-flex items-center justify-center rounded-md w-9 h-9 transition-all duration-200"
        aria-label="Atualizações do protocolo"
      >
        <Bell className="w-4 h-4" />
        <span className="absolute top-1 right-1 w-2 h-2 bg-ember rounded-full animate-pulse" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 glass-dark rounded-xl border border-charcoal-lighter/50 shadow-xl shadow-black/30 z-50 overflow-hidden">
          <div className="p-3 border-b border-charcoal-lighter/50 flex items-center gap-2">
            <Bell className="w-4 h-4 text-ember" />
            <span className="text-sm font-semibold text-ash">Atualizações do Protocolo</span>
          </div>
          <div className="max-h-72 overflow-y-auto custom-scrollbar">
            {updates.map((update, i) => (
              <div
                key={i}
                className="p-3 border-b border-charcoal-lighter/30 last:border-0 hover:bg-charcoal-light/30 transition-colors cursor-default"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-ember">{update.date}</span>
                </div>
                <p className="text-sm text-ash font-medium">{update.title}</p>
                <p className="text-xs text-ash-muted mt-0.5">{update.desc}</p>
              </div>
            ))}
          </div>
          <div className="p-2.5 border-t border-charcoal-lighter/50 text-center">
            <span className="text-xs text-ash-muted hover:text-ember transition-colors cursor-pointer">Ver todas as atualizações</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================
   CONTRACT INFO COMPONENT
   ================================================================ */

function ContractInfo() {
  const [copied, setCopied] = useState(false);
  const LIPT_CONTRACT_ADDRESS = '0x1a2B3c4D5e6F7890AbCdEf1234567890aBcDeF00';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(LIPT_CONTRACT_ADDRESS);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = LIPT_CONTRACT_ADDRESS;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const displayAddress = `${LIPT_CONTRACT_ADDRESS.slice(0, 6)}...${LIPT_CONTRACT_ADDRESS.slice(-4)}`;

  return (
    <div className="glass-dark rounded-xl px-4 py-3 flex items-center gap-3 border border-charcoal-lighter/30">
      <div className="flex items-center gap-2 min-w-0">
        <div className="w-6 h-6 rounded-full bg-ember/15 border border-ember/30 flex items-center justify-center shrink-0">
          <span className="text-[10px] font-bold text-ember">L</span>
        </div>
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-wider text-ash-muted font-medium leading-none">Contrato</p>
          <p className="text-xs text-ash font-mono truncate mt-0.5">{displayAddress}</p>
        </div>
      </div>
      <button
        onClick={handleCopy}
        className={cn(
          "shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
          copied
            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
            : "bg-charcoal-light border border-charcoal-lighter text-ash-muted hover:text-ember hover:border-ember/30 hover:bg-ember/10"
        )}
        aria-label={copied ? "Endereço copiado" : "Copiar endereço"}
      >
        {copied ? (
          <>
            <Check className="w-3 h-3" />
            <span className="hidden sm:inline">Copiado!</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3" />
            <span className="hidden sm:inline">Copiar</span>
          </>
        )}
      </button>
    </div>
  );
}

/* ================================================================
   DEFAULT DATA (fallback when API is unavailable)
   ================================================================ */

const DEFAULT_STATS = {
  marketCap: 2_500_000,
  totalBurned: 1_000_000,
  holders: 4_200,
  liptPrice: 0.000595,
  circulating: "423456789",
  totalSupply: "1000000000",
  stakingAPY: 42,
  burnRate: 2.5,
  volume24h: "48923.45",
  priceChange24h: 5.7,
  transactions24h: 3847,
  liquidityUSD: "128456.78",
};

const TOKENOMICS = [
  { name: 'Em Circulação', value: 42, color: '#FF4D00' },
  { name: 'The Vault (Staking)', value: 25, color: '#8247E5' },
  { name: 'The Forge (Mining)', value: 15, color: '#FF6A2B' },
  { name: 'Queimados', value: 10, color: '#CC3D00' },
  { name: 'Reserva do Protocolo', value: 8, color: '#9B6EF5' },
];

const TOKEN_STATS = {
  totalSupply: 10_000_000_000,
  burnedPercent: 10,
  circulatingSupply: 4_200_000_000,
  stakedPercent: 25,
};

const MARQUEE_ITEMS = [
  '🔥 1,000,000 LIPT Queimados',
  '⚡ $2.5M Market Cap',
  '💎 4,200 Holders Ativos',
  '🔗 Polygon Mainnet',
  '📈 +15% Volume 24h',
  '🎯 The Forge Ativo',
  '🛡️ The Vault Seguro',
  '🔥 BurnEngine Rodando',
];

const FAQ_DATA = [
  {
    question: 'O que é o LIPT Protocol?',
    answer:
      'O LIPT Protocol é um protocolo DeFi deflacionário construído na Polygon Mainnet. Nosso ecossistema combina mecanismos de mineração (The Forge), staking (The Vault) e queima automática (The BurnEngine) para criar um modelo econômico sustentável que recompensa holders e reduz a oferta ao longo do tempo.',
  },
  {
    question: 'Como funciona o The Forge?',
    answer:
      'The Forge é o módulo de mineração do LIPT Protocol. Os usuários podem forjar novos tokens LIPT fornecendo liquidez em nossos pools. A emissão é controlada algoritmicamente, com taxas decrescentes ao longo do tempo, garantindo que a escassez natural aumente o valor do token.',
  },
  {
    question: 'O que é o The Vault?',
    answer:
      'The Vault é o protocolo de staking do LIPT. Ao depositar seus tokens LIPT no Vault, você recebe recompensas proporcionais ao tempo de stake e ao volume do protocolo. Quanto mais tempo você staking, maiores são os multiplicadores de recompensa.',
  },
  {
    question: 'Como o BurnEngine funciona?',
    answer:
      'O BurnEngine é nosso mecanismo deflacionário. Cada transação de swap no protocolo aplica uma taxa de 2% que é automaticamente enviada para o endereço de queima (dead address). Isso reduz a oferta total de LIPT a cada transação, aumentando a escassez e valorizando o token.',
  },
  {
    question: 'Qual rede o LIPT utiliza?',
    answer:
      'O LIPT Protocol opera exclusivamente na Polygon Mainnet, aproveitando a alta velocidade de transações e baixas taxas da rede Polygon para oferecer uma experiência DeFi eficiente e acessível a todos.',
  },
];

/* ================================================================
   NAVIGATION BAR COMPONENT
   ================================================================ */

const NAV_LINKS = [
  { label: 'Ecossistema', href: '#ecossistema' },
  { label: 'Tokenomics', href: '#tokenomics' },
  { label: 'Como Funciona', href: '#como-funciona' },
  { label: 'FAQ', href: '#faq' },
];

function NavBar({ onConnectWallet }: { onConnectWallet: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offset = 80; // Account for sticky nav height (h-16 = 64px + padding)
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-charcoal/80 backdrop-blur-xl border-b border-charcoal-lighter/50 shadow-lg shadow-black/20'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Brand */}
          <a href="#" className="flex items-center gap-2.5 group" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            <LiptLogo className="w-8 h-8" />
            <span className="font-heading font-bold text-ash text-lg tracking-wide group-hover:text-ember transition-colors">
              LIPT Protocol
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-ash-muted hover:text-ember text-sm font-medium px-3 py-2 rounded-lg hover:bg-ember/10 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Wallet Button + Notifications + Mobile Menu */}
          <div className="flex items-center gap-3">
            <LanguageToggle />
            <ProtocolUpdates />
            <Button className="hidden sm:flex bg-ember hover:bg-ember-light text-white font-semibold text-sm h-9 px-4 gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]" onClick={onConnectWallet}>
                <Wallet className="w-4 h-4" />
                Conectar Carteira
              </Button>

            {/* Mobile Menu */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger className="md:hidden text-ash-muted hover:text-ember hover:bg-ember/10 inline-flex items-center justify-center rounded-md w-10 h-10">
                <Menu className="w-5 h-5" />
                <span className="sr-only">Abrir menu</span>
              </SheetTrigger>
              <SheetContent side="right" className="bg-charcoal border-charcoal-lighter w-72">
                <SheetHeader>
                  <SheetTitle className="text-ash font-heading flex items-center gap-2">
                    <LiptLogo className="w-6 h-6" />
                    LIPT Protocol
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-1 px-4 mt-4">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-ash-muted hover:text-ember text-sm font-medium px-3 py-2.5 rounded-lg hover:bg-ember/10 transition-all duration-200"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <div className="px-4 mt-4">
                  <Button className="w-full bg-ember hover:bg-ember-light text-white font-semibold text-sm h-10 gap-2 sm:hidden" onClick={onConnectWallet}>
                      <Wallet className="w-4 h-4" />
                      Conectar Carteira
                    </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ================================================================
   BACK TO TOP BUTTON COMPONENT
   ================================================================ */

function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-ember hover:bg-ember-light text-white shadow-lg shadow-ember/30 flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,77,0,0.4)] hover:scale-110 active:scale-95 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
      aria-label="Voltar ao topo"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
}

/* ================================================================
   TOKEN BURN COUNTDOWN COMPONENT
   ================================================================ */

function BurnCountdown() {
  const calculateTimeLeft = useCallback(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);
    targetDate.setHours(0, 0, 0, 0);
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000),
    };
  }, []);

  // Initialize with zeros to avoid hydration mismatch, update on client mount
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  const timeUnits = [
    { value: timeLeft.days, label: 'Dias' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Minutos' },
    { value: timeLeft.seconds, label: 'Segundos' },
  ];

  return (
    <div className="text-center">
      <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8">
        {timeUnits.map((unit, index) => (
          <React.Fragment key={unit.label}>
            <div className="flex flex-col items-center">
              <div className="glass-dark rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center animate-pulse-glow">
                <span className="text-2xl sm:text-3xl font-bold font-heading text-ember">
                  {String(unit.value).padStart(2, '0')}
                </span>
              </div>
              <span className="text-xs text-ash-muted mt-2 font-medium uppercase tracking-wider">{unit.label}</span>
            </div>
            {index < timeUnits.length - 1 && (
              <span className="text-ember/50 text-2xl font-bold mt-[-1.25rem]">:</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   ANIMATED COUNTER HOOK
   ================================================================ */

function useAnimatedCounter(
  target: number,
  duration: number = 2000,
  prefix: string = '',
  suffix: string = '',
  decimals: number = 0
) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = 0;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + (target - start) * eased;
      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  const formatted = decimals > 0
    ? value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    : Math.round(value).toLocaleString('pt-BR');

  return `${prefix}${formatted}${suffix}`;
}

/* ================================================================
   FIRE PARTICLES COMPONENT
   ================================================================ */

function FireParticles() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: ((i * 47 + 13) % 97) + 1.5,
      delay: ((i * 31 + 7) % 50) / 10,
      size: ((i * 23 + 5) % 4) + 2,
      duration: ((i * 17 + 3) % 30) / 10 + 3,
    })),
  []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full animate-fire-particle"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: `radial-gradient(circle, ${p.id % 3 === 0 ? '#8247E5' : '#FF4D00'}, transparent)`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

/* ================================================================
   DONUT CHART COMPONENT
   ================================================================ */

function DonutChart({ data }: { data: { name: string; value: number; color: string }[] }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const segments = useMemo(() => {
    const result: Array<{ name: string; value: number; color: string; percent: number; dashArray: string; dashOffset: number }> = [];
    let cumulative = 0;
    for (const segment of data) {
      const percent = (segment.value / total) * 100;
      result.push({
        ...segment,
        percent,
        dashArray: `${percent} ${100 - percent}`,
        dashOffset: -cumulative,
      });
      cumulative += percent;
    }
    return result;
  }, [data, total]);

  return (
    <div>
      <div className="relative w-56 h-56 mx-auto sm:w-64 sm:h-64">
        <svg viewBox="0 0 36 36" className="w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
          {segments.map((segment, idx) => {
            const isHovered = hoveredIndex === idx;
            const strokeW = isHovered ? 4 : 3;
            const r = 15.91549431;

            return (
              <circle
                key={segment.name}
                cx="18"
                cy="18"
                r={r}
                fill="none"
                stroke={segment.color}
                strokeWidth={strokeW}
                strokeDasharray={segment.dashArray}
                strokeDashoffset={String(segment.dashOffset)}
                strokeLinecap="butt"
                className="transition-all duration-500 cursor-pointer"
                style={{
                  filter: isHovered ? `drop-shadow(0 0 6px ${segment.color}80)` : 'none',
                  opacity: hoveredIndex !== null && !isHovered ? 0.5 : 1,
                }}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
          {/* Inner background circle for depth */}
          <circle cx="18" cy="18" r="11.5" fill="rgba(30,30,30,0.6)" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs text-ash-muted">Total Supply</span>
          <span className="text-lg font-bold font-heading text-ember">10B</span>
          <span className="text-xs text-ash-muted">LIPT</span>
        </div>
        {/* Hovered percentage label */}
        {hoveredIndex !== null && (
          <div
            className="absolute flex items-center justify-center text-xs font-bold text-white pointer-events-none"
            style={{
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) translateY(28px)',
            }}
          >
            <span
              className="px-2 py-0.5 rounded-md text-[10px]"
              style={{
                backgroundColor: segments[hoveredIndex].color + '30',
                color: segments[hoveredIndex].color,
                border: `1px solid ${segments[hoveredIndex].color}50`,
              }}
            >
              {segments[hoveredIndex].name} · {segments[hoveredIndex].percent}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================
   SWAP CALCULATOR COMPONENT
   ================================================================ */

function SwapCalculator({ onConnectWallet, liveStats }: { onConnectWallet: () => void; liveStats?: { price?: string } | null }) {
  const [usdtAmount, setUsdtAmount] = useState<string>('100');
  const price = liveStats?.price ? parseFloat(liveStats.price) : DEFAULT_STATS.liptPrice;
  const burnRate = DEFAULT_STATS.burnRate;

  const calculate = useCallback(() => {
    const usdt = parseFloat(usdtAmount) || 0;
    const liptBeforeBurn = usdt / price;
    const burned = liptBeforeBurn * burnRate;
    const liptReceived = liptBeforeBurn - burned;
    return { liptBeforeBurn, burned, liptReceived };
  }, [usdtAmount, price]);

  const result = calculate();

  return (
    <Card className="gradient-border-ember bg-charcoal-light/80 backdrop-blur-xl overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-heading text-ember flex items-center gap-2">
          <Zap className="w-5 h-5" />
          Calculadora de Swap
        </CardTitle>
        <CardDescription className="text-ash-muted">
          Simule suas trocas USDT → LIPT com taxa de queima
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* USDT Input */}
        <div className="space-y-2">
          <label className="text-sm text-ash-muted font-medium">Você envia</label>
          <div className="relative">
            <Input
              type="number"
              value={usdtAmount}
              onChange={(e) => setUsdtAmount(e.target.value)}
              className="bg-charcoal border-charcoal-lighter text-ash text-lg font-semibold pr-16 h-14 focus:border-ember focus:ring-ember/20"
              placeholder="0.00"
              min="0"
              step="0.01"
            />
            <Badge className="absolute right-3 top-1/2 -translate-y-1/2 bg-emerald-600/20 text-emerald-400 border-emerald-600/30 text-sm px-3 py-1">
              USDT
            </Badge>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="w-10 h-10 rounded-full bg-ember/10 border border-ember/30 flex items-center justify-center animate-float">
            <ArrowDownLeft className="w-5 h-5 text-ember" />
          </div>
        </div>

        {/* LIPT Output */}
        <div className="space-y-2">
          <label className="text-sm text-ash-muted font-medium">Você recebe (estimativa)</label>
          <div className="relative bg-charcoal rounded-lg border border-charcoal-lighter p-4 h-14 flex items-center">
            <span className="text-lg font-bold text-ember">
              {result.liptReceived > 0
                ? result.liptReceived.toLocaleString('pt-BR', { maximumFractionDigits: 2 })
                : '0'}
            </span>
            <Badge className="ml-auto bg-ember/20 text-ember border-ember/30 text-sm px-3 py-1">
              LIPT
            </Badge>
          </div>
        </div>

        <Separator className="bg-charcoal-lighter" />

        {/* Details */}
        <div className="space-y-3 text-sm">
          <div className="flex justify-between text-ash-muted">
            <span>Preço LIPT</span>
            <span className="text-ash font-medium">${price.toFixed(6)}</span>
          </div>
          <div className="flex justify-between text-ash-muted">
            <span>LIPT antes da queima</span>
            <span className="text-ash font-medium">
              {result.liptBeforeBurn.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between text-ash-muted">
            <span>Taxa de queima (2%)</span>
            <span className="text-red-400 font-medium">
              -{result.burned.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} LIPT
            </span>
          </div>
          <Separator className="bg-charcoal-lighter" />
          <div className="flex justify-between font-semibold">
            <span className="text-ash">LIPT líquido</span>
            <span className="text-ember">
              {result.liptReceived.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Button className="w-full bg-ember hover:bg-ember-light text-white font-semibold h-12 text-base transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,77,0,0.3)]" onClick={onConnectWallet}>
            Conectar Carteira & Swap
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
      </CardFooter>
    </Card>
  );
}

/* ================================================================
   LIPT LOGO SVG COMPONENT
   ================================================================ */

function LiptLogo({ className = 'w-16 h-16' }: { className?: string }) {
  return (
    <div className={className}>
      <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Outer ring */}
        <circle cx="60" cy="60" r="56" stroke="url(#ember-gradient)" strokeWidth="3" className="animate-spin-slow" style={{ animationDuration: '20s' }} />
        {/* Inner glow circle */}
        <circle cx="60" cy="60" r="46" fill="url(#ember-gradient)" opacity="0.15" />
        <circle cx="60" cy="60" r="46" stroke="#FF4D00" strokeWidth="1" opacity="0.3" />
        {/* Flame icon */}
        <path
          d="M60 25c0 0-18 22-18 38c0 10 8 18 18 18s18-8 18-18c0-16-18-38-18-38z"
          fill="url(#flame-gradient)"
          className="animate-pulse-ember"
        />
        {/* Inner flame highlight */}
        <path
          d="M60 45c0 0-10 12-10 20c0 5.5 4.5 10 10 10s10-4.5 10-10c0-8-10-20-10-20z"
          fill="#FF6A2B"
          opacity="0.8"
        />
        {/* Forge anvil base */}
        <rect x="48" y="82" width="24" height="6" rx="2" fill="#8247E5" opacity="0.8" />
        <rect x="44" y="86" width="32" height="4" rx="1" fill="#8247E5" opacity="0.6" />
        {/* LIPT text */}
        <foreignObject x="30" y="92" width="60" height="20">
          <span style={{ fontSize: '12px', fontWeight: 700, fontFamily: 'sans-serif', color: '#F8F9FA', textAlign: 'center', display: 'block', lineHeight: '20px' }}>LIPT</span>
        </foreignObject>
        <defs>
          <linearGradient id="ember-gradient" x1="0" y1="0" x2="120" y2="120">
            <stop offset="0%" stopColor="#FF4D00" />
            <stop offset="50%" stopColor="#8247E5" />
            <stop offset="100%" stopColor="#FF4D00" />
          </linearGradient>
          <linearGradient id="flame-gradient" x1="60" y1="25" x2="60" y2="81">
            <stop offset="0%" stopColor="#FF6A2B" />
            <stop offset="100%" stopColor="#CC3D00" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ================================================================
   MOCK TRANSACTION DATA
   ================================================================ */

type TransactionType = 'swap' | 'stake' | 'burn';

interface Transaction {
  id: string;
  type: TransactionType;
  description: string;
  address: string;
  amount: string;
  time: string;
}

const SWAP_DESCRIPTIONS = ['Swap USDT → LIPT', 'Swap MATIC → LIPT', 'Swap USDC → LIPT'];
const STAKE_DESCRIPTIONS = ['Stake LIPT no Vault', 'Unstake LIPT', 'Reivindicar Recompensa'];
const BURN_DESCRIPTIONS = ['Auto-Burn (Swap Tax)', 'Queima Programada'];

function generateMockTransaction(): Transaction {
  const rand = Math.random();
  const type: TransactionType = rand < 0.5 ? 'swap' : rand < 0.8 ? 'stake' : 'burn';

  const id = `tx-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const address = `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`;
  const amount = `${Math.floor(Math.random() * 100000).toLocaleString('pt-BR')} LIPT`;
  const time = `${Math.floor(Math.random() * 59) + 1} min atrás`;

  let description: string;
  if (type === 'swap') {
    description = SWAP_DESCRIPTIONS[Math.floor(Math.random() * SWAP_DESCRIPTIONS.length)];
  } else if (type === 'stake') {
    description = STAKE_DESCRIPTIONS[Math.floor(Math.random() * STAKE_DESCRIPTIONS.length)];
  } else {
    description = BURN_DESCRIPTIONS[Math.floor(Math.random() * BURN_DESCRIPTIONS.length)];
  }

  return { id, type, description, address, amount, time };
}

/* ================================================================
   TRANSACTION FEED COMPONENT (with live indicator)
   ================================================================ */

function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Generate initial transactions only on client to avoid hydration mismatch
    setTransactions(Array.from({ length: 10 }, generateMockTransaction));
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const interval = setInterval(() => {
      setTransactions(prev => {
        const newTx = generateMockTransaction();
        return [newTx, ...prev.slice(0, 9)];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <section id="transacoes" className="relative py-20 sm:py-28 px-4">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
      <div className="max-w-4xl mx-auto">
        <Card className="glass-dark overflow-hidden">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-ember" />
              Transações Recentes
              <LiveIndicator />
            </CardTitle>
            <CardDescription>Atividade em tempo real do protocolo</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 rounded-lg bg-charcoal/50 border border-charcoal-lighter/30 hover:border-ember/20 transition-all">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${tx.type === 'swap' ? 'bg-ember/20' : tx.type === 'stake' ? 'bg-neon/20' : 'bg-red-500/20'}`}>
                      {tx.type === 'swap' ? (
                        <ArrowRightLeft className="w-4 h-4 text-ember" />
                      ) : tx.type === 'stake' ? (
                        <Lock className="w-4 h-4 text-neon" />
                      ) : (
                        <Flame className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm text-ash font-medium truncate">{tx.description}</p>
                      <p className="text-xs text-ash-muted truncate">{tx.address}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-3">
                    <p className={`text-sm font-semibold ${tx.type === 'burn' ? 'text-red-400' : 'text-ash'}`}>{tx.amount}</p>
                    <p className="text-xs text-ash-muted">{tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* ================================================================
   PRICE CHART COMPONENT
   ================================================================ */

function PriceChart() {
  const prices = [0.00065, 0.00072, 0.00068, 0.00081, 0.00075, 0.00084, 0.00082];
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = max - min || 0.0001;

  const width = 600;
  const height = 200;
  const padding = 40;

  const points = prices.map((p, i) => ({
    x: padding + (i / (prices.length - 1)) * (width - 2 * padding),
    y: height - padding - ((p - min) / range) * (height - 2 * padding),
  }));

  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaData = `${pathData} L ${points[points.length - 1].x} ${height - padding} L ${points[0].x} ${height - padding} Z`;

  const change = ((prices[prices.length - 1] - prices[0]) / prices[0] * 100).toFixed(1);
  const isPositive = parseFloat(change) >= 0;

  return (
    <Card className="glass-dark overflow-hidden">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Preço LIPT (7 dias)</CardTitle>
            <CardDescription>Evolução do preço semanal</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold font-heading text-ember">${prices[prices.length - 1].toFixed(6)}</p>
            <p className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {isPositive ? '+' : ''}{change}%
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF4D00" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#FF4D00" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0, 1, 2, 3, 4].map(i => (
            <line key={i} x1={padding} y1={padding + (i / 4) * (height - 2 * padding)} x2={width - padding} y2={padding + (i / 4) * (height - 2 * padding)} stroke="#333" strokeWidth="0.5" />
          ))}
          <path d={areaData} fill="url(#priceGradient)" />
          <path d={pathData} fill="none" stroke="#FF4D00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#1A1A1B" stroke="#FF4D00" strokeWidth="2" />
          ))}
          {days.map((day, i) => {
            const tx = padding + (i / (days.length - 1)) * (width - 2 * padding);
            return (
              <foreignObject key={day} x={tx - 20} y={height - 20} width={40} height={16}>
                <span style={{ fontSize: '10px', color: '#888', textAlign: 'center', display: 'block', lineHeight: '16px' }}>{day}</span>
              </foreignObject>
            );
          })}
          {[min, max].map((price) => {
            const ty = height - padding - ((price - min) / range) * (height - 2 * padding) + 3;
            return (
              <foreignObject key={price} x={0} y={ty - 8} width={padding - 8} height={16}>
                <span style={{ fontSize: '9px', color: '#888', textAlign: 'right', display: 'block', lineHeight: '16px' }}>${price.toFixed(5)}</span>
              </foreignObject>
            );
          })}
        </svg>
      </CardContent>
    </Card>
  );
}

/* ================================================================
   COMMUNITY SECTION COMPONENT (Enhanced Social Icons)
   ================================================================ */

function CommunitySection() {
  const communities = [
    {
      name: 'Twitter/X',
      followers: '12.5K',
      icon: TwitterXIcon,
      color: 'ember',
      link: '#',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(120,130,150,0.3)]',
    },
    {
      name: 'Telegram',
      followers: '8.2K',
      icon: TelegramIcon,
      color: 'neon',
      link: '#',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(59,153,252,0.3)]',
    },
    {
      name: 'Discord',
      followers: '5.1K',
      icon: DiscordIcon,
      color: 'neon',
      link: '#',
      hoverGlow: 'hover:shadow-[0_0_30px_rgba(88,101,242,0.3)]',
    },
  ];

  return (
    <section className="py-20 px-4 bg-charcoal-light/30">
      <div className="max-w-4xl mx-auto text-center">
        <Badge variant="outline" className="border-neon/30 text-neon mb-4 px-4 py-1.5 text-sm">
          <Users className="w-3.5 h-3.5 mr-1.5" />
          Comunidade
        </Badge>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ash mb-4">
          Junte-se à{' '}
          <span className="bg-gradient-to-r from-ember to-neon bg-clip-text text-transparent">
            Comunidade
          </span>
        </h2>
        <p className="text-ash-muted text-lg max-w-xl mx-auto mb-12">
          Mais de 25 mil membros fortalecendo o protocolo. Participe e ajude a construir o futuro do DeFi.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {communities.map((c) => (
            <a
              key={c.name}
              href={c.link}
              className={cn(
                "glass-dark rounded-2xl p-6 group hover:-translate-y-1 transition-all duration-300",
                c.hoverGlow
              )}
            >
              <c.icon className={`w-8 h-8 ${c.color === 'ember' ? 'text-ash-muted group-hover:text-[#9CA3AF]' : 'text-ash-muted group-hover:text-neon'} mx-auto mb-4 group-hover:scale-110 transition-all duration-300`} />
              <p className="text-2xl font-bold font-heading text-ash mb-1">{c.followers}</p>
              <p className="text-ash-muted text-sm">{c.name}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   TRUST / PARTNERS SECTION COMPONENT
   ================================================================ */

function TrustSection() {
  const chainPartners = [
    {
      name: 'Polygon',
      role: 'Rede Principal',
      icon: Hexagon,
      description: 'Infraestrutura blockchain L2 de alto desempenho',
      color: '#8247E5',
    },
    {
      name: 'QuickSwap',
      role: 'DEX Principal',
      icon: ArrowRightLeft,
      description: 'Trocas descentralizadas de LIPT tokens',
      color: '#FF4D00',
    },
    {
      name: 'Chainlink',
      role: 'Oráculos',
      icon: Database,
      description: 'Feeds de preços descentralizados em tempo real',
      color: '#375BD2',
    },
  ];

  const securityPartners = [
    {
      name: 'CertiK',
      role: 'Auditoria de Segurança',
      icon: ShieldCheck,
      description: 'Auditoria completa dos smart contracts',
      badge: 'Audited',
      badgeColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    },
    {
      name: 'OpenZeppelin',
      role: 'Bibliotecas de Contratos',
      icon: Shield,
      description: 'Padrões de segurança e bibliotecas testadas',
      badge: 'Verified',
      badgeColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    },
  ];

  const integrations = [
    { label: 'Multi-sig Wallet', icon: Lock, status: 'Ativo' },
    { label: 'Price Oracle', icon: Activity, status: 'Ativo' },
    { label: 'Governance DAO', icon: Landmark, status: 'Em breve' },
    { label: 'Cross-chain Bridge', icon: Network, status: 'Em breve' },
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 dot-grid-pattern opacity-30" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-14">
          <Badge variant="outline" className="border-ember/30 text-ember mb-4 px-4 py-1.5 text-sm">
            <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
            Parceiros & Ecossistema
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ash mb-4">
            Construído com{' '}
            <span className="bg-gradient-to-r from-ember to-neon bg-clip-text text-transparent">
              Parceiros de Confiança
            </span>
          </h2>
          <p className="text-ash-muted text-lg max-w-xl mx-auto">
            Auditado, verificado e integrado com as melhores infraestruturas do ecossistema Web3
          </p>
        </div>

        {/* Chain Partners */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-ash uppercase tracking-wider mb-5 flex items-center gap-2">
            <Blocks className="w-4 h-4 text-neon" />
            Parceiros de Rede
          </h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {chainPartners.map((partner, idx) => (
              <AnimatedSection key={partner.name} delay={idx * 100}>
                <div className="glass-dark rounded-xl p-5 sm:p-6 group hover:bg-charcoal-light/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,77,0,0.08)] border border-charcoal-lighter/30 hover:border-ember/20">
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300"
                      style={{
                        backgroundColor: partner.color + '15',
                        border: `1px solid ${partner.color}30`,
                      }}
                    >
                      <partner.icon className="w-6 h-6" style={{ color: partner.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-ash mb-0.5">{partner.name}</p>
                      <p className="text-xs font-medium mb-1.5" style={{ color: partner.color }}>{partner.role}</p>
                      <p className="text-xs text-ash-muted leading-relaxed">{partner.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Security Partners */}
        <div className="mb-12">
          <h3 className="text-sm font-semibold text-ash uppercase tracking-wider mb-5 flex items-center gap-2">
            <Fingerprint className="w-4 h-4 text-ember" />
            Segurança & Auditoria
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {securityPartners.map((partner, idx) => (
              <AnimatedSection key={partner.name} delay={idx * 100}>
                <div className="glass-dark rounded-xl p-5 sm:p-6 group hover:bg-charcoal-light/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,77,0,0.08)] border border-charcoal-lighter/30 hover:border-ember/20">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-all duration-300">
                      <partner.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-bold text-ash">{partner.name}</p>
                        <Badge className={cn('text-[10px] px-2 py-0 border', partner.badgeColor)}>
                          {partner.badge}
                        </Badge>
                      </div>
                      <p className="text-xs text-emerald-400 font-medium mb-1.5">{partner.role}</p>
                      <p className="text-xs text-ash-muted leading-relaxed">{partner.description}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Integrations Grid */}
        <div>
          <h3 className="text-sm font-semibold text-ash uppercase tracking-wider mb-5 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-ember-light" />
            Integrações & Features
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {integrations.map((item, idx) => (
              <AnimatedSection key={item.label} delay={idx * 80}>
                <div className="glass-dark rounded-lg p-4 text-center group hover:bg-charcoal-light/60 transition-all duration-300 hover:border-ember/20 border border-charcoal-lighter/30">
                  <div className="w-10 h-10 rounded-lg bg-charcoal-light border border-charcoal-lighter/50 flex items-center justify-center mx-auto mb-3 group-hover:border-ember/30 group-hover:bg-ember/10 transition-all duration-300">
                    <item.icon className="w-5 h-5 text-ash-muted group-hover:text-ember transition-colors" />
                  </div>
                  <p className="text-xs font-semibold text-ash mb-1">{item.label}</p>
                  <Badge
                    variant="secondary"
                    className={cn(
                      'text-[10px] border',
                      item.status === 'Ativo'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                    )}
                  >
                    {item.status === 'Ativo' ? '✓' : '◷'} {item.status}
                  </Badge>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FLOATING STATS BAR COMPONENT
   ================================================================ */

function FloatingStatsBar({ liveStats }: { liveStats?: LiveStats | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const price = liveStats?.price ? parseFloat(liveStats.price) : DEFAULT_STATS.liptPrice;
  const mcap = liveStats?.marketCap || '$2.5M';
  const h = liveStats?.holders || DEFAULT_STATS.holders;
  const burned = liveStats?.totalBurned || '156M';
  const change = liveStats?.priceChange24h || DEFAULT_STATS.priceChange24h;

  const stats = [
    { label: 'LIPT Price', value: `$${price.toFixed(6)}`, change: `+${change}%`, positive: change >= 0 },
    { label: 'Market Cap', value: typeof mcap === 'string' ? mcap : `$${Math.round(mcap).toLocaleString()}`, positive: true },
    { label: 'Holders', value: typeof h === 'number' ? h.toLocaleString() : h, positive: true },
    { label: 'Total Burned', value: `${burned}`, positive: true },
  ];

  return (
    <div
      className={`sticky top-16 z-40 w-full transition-all duration-500 ${
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none absolute'
      }`}
    >
      <div className="bg-charcoal/90 backdrop-blur-md border-b border-charcoal-lighter/30 px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 sm:gap-8 overflow-x-auto">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-ash-muted font-medium hidden sm:inline">{stat.label}</span>
              <span className="text-sm font-semibold text-ash">{stat.value}</span>
              {stat.change && (
                <span className={`text-xs font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.positive ? '▲' : '▼'} {stat.change}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   ROADMAP TIMELINE COMPONENT
   ================================================================ */

function RoadmapTimeline() {
  const phases = [
    {
      phase: "Fase 1",
      title: "Fundação",
      status: "completed" as const,
      items: ["Deploy na Polygon Mainnet", "Token LIPT launched", "Contratos auditados", "The Forge ativo"],
    },
    {
      phase: "Fase 2",
      title: "Expansão",
      status: "active" as const,
      items: ["The Vault v2 com yield otimizado", "BurnEngine automático", "Integração DEX multi-chain", "Governança DAO"],
    },
    {
      phase: "Fase 3",
      title: "Evolução",
      status: "upcoming" as const,
      items: ["Cross-chain bridge", "NFT marketplace", "Staking de NFTs", "Mobile app"],
    },
    {
      phase: "Fase 4",
      title: "Dominância",
      status: "upcoming" as const,
      items: ["Layer 2 dedicada", "SDK para desenvolvedores", "Programa de incentivos", "Listagem em CEX"],
    },
  ];

  return (
    <section id="roadmap" className="py-20 px-4 bg-charcoal-gradient">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-ember/30 text-ember mb-4 px-4 py-1.5 text-sm">
            <Rocket className="w-3.5 h-3.5 mr-1.5" />
            Roadmap
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ash mb-4">
            Rota de <span className="bg-gradient-to-r from-ember to-neon bg-clip-text text-transparent">Evolução</span>
          </h2>
          <p className="text-ash-muted text-lg max-w-xl mx-auto">
            Nosso plano para construir o ecossistema DeFi mais robusto da Polygon.
          </p>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-charcoal-lighter md:-translate-x-px" />

          {phases.map((phase, i) => (
            <div key={phase.phase} className={`relative flex items-start mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
              {/* Dot on timeline */}
              <div
                className={`absolute left-4 md:left-1/2 w-3 h-3 rounded-full border-2 -translate-x-1/2 z-10 ${
                  phase.status === 'completed' ? 'bg-ember border-ember' :
                  phase.status === 'active' ? 'bg-neon border-neon animate-pulse' :
                  'bg-charcoal border-charcoal-lighter'
                }`}
                style={{ top: '8px' }}
              />

              {/* Content */}
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="glass-dark rounded-xl p-6">
                  <div className={`inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full text-xs font-bold ${
                    phase.status === 'completed' ? 'bg-ember/20 text-ember' :
                    phase.status === 'active' ? 'bg-neon/20 text-neon' :
                    'bg-charcoal-lighter/30 text-ash-muted'
                  }`}>
                    {phase.status === 'completed' && <Check className="w-3 h-3" />}
                    {phase.status === 'active' && <Zap className="w-3 h-3" />}
                    {phase.phase}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-ash mb-3">{phase.title}</h3>
                  <ul className={`space-y-2 ${i % 2 === 0 ? 'md:ml-auto md:inline-block md:text-left' : ''}`}>
                    {phase.items.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-sm text-ash-muted">
                        <div className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          phase.status === 'completed' ? 'bg-ember' :
                          phase.status === 'active' ? 'bg-neon' : 'bg-charcoal-lighter'
                        }`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   REFERRAL CARD COMPONENT
   ================================================================ */

function ReferralCard() {
  return (
    <Card className="gradient-border-neon bg-charcoal/80 backdrop-blur-sm overflow-hidden relative">
      <div className="absolute inset-0 bg-gradient-to-r from-neon/5 to-ember/5 pointer-events-none" />
      <CardContent className="relative p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-16 h-16 rounded-2xl bg-neon/10 border border-neon/20 flex items-center justify-center shrink-0">
          <Gift className="w-8 h-8 text-neon" />
        </div>
        <div className="flex-1 text-center sm:text-left">
          <h3 className="font-heading text-xl font-bold text-ash mb-2">Programa de Indicação</h3>
          <p className="text-ash-muted text-sm">
            Indique amigos e ganhe 5% de comissão em cada swap que eles realizarem.
            Seu amigo também ganha bônus de LIPT no primeiro swap!
          </p>
        </div>
        <Button className="bg-neon hover:bg-neon-light text-white font-semibold shrink-0">
          Saiba Mais
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

/* ================================================================
   COOKIE CONSENT BANNER COMPONENT
   ================================================================ */

function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('lipt-cookies-accepted') !== 'true';
  });

  const handleAccept = () => {
    localStorage.setItem('lipt-cookies-accepted', 'true');
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem('lipt-cookies-accepted', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[90] animate-slide-up-banner"
    >
      <div className="glass-dark border-t border-ember/40 bg-charcoal/95 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-ash-muted text-sm text-center sm:text-left flex-1">
              Utilizamos cookies para melhorar sua experiência. Ao continuar navegando, você concorda com nossa{' '}
              <a href="#" className="text-ember hover:underline">Política de Privacidade</a>.
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={handleReject}
                className="px-4 py-2 rounded-lg text-sm font-medium text-ash-muted border border-charcoal-lighter hover:text-ash hover:border-charcoal-lighter/80 hover:bg-charcoal-light/50 transition-all duration-200"
              >
                Recusar
              </button>
              <button
                onClick={handleAccept}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-ember hover:bg-ember-light transition-all duration-200 shadow-lg shadow-ember/20 hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]"
              >
                Aceitar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   NEWSLETTER SECTION COMPONENT
   ================================================================ */

function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <section id="newsletter" className="relative py-20 sm:py-28 px-4">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-ember/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-ember/10 border border-ember/30 mb-6">
            <Mail className="w-7 h-7 text-ember" />
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ash mb-4">
            Fique por Dentro do{' '}
            <span className="bg-gradient-to-r from-ember to-ember-light bg-clip-text text-transparent text-glow-ember">
              Fogo
            </span>
          </h2>
          <p className="text-ash-muted text-lg max-w-xl mx-auto">
            Receba atualizações exclusivas, análises de mercado e novidades do protocolo diretamente no seu email.
          </p>
        </div>

        {/* Newsletter Card */}
        <Card className="gradient-border-ember bg-charcoal-light/80 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  className="bg-charcoal border-charcoal-lighter text-ash placeholder:text-ash-muted/60 focus:border-ember focus:ring-ember/20 h-12 flex-1"
                  required
                />
                <Button
                  type="submit"
                  disabled={subscribed}
                  className="bg-ember hover:bg-ember-light text-white font-semibold h-12 px-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,77,0,0.3)] disabled:opacity-70 disabled:cursor-not-allowed shrink-0"
                >
                  {subscribed ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Inscrito!
                    </>
                  ) : (
                    <>
                      <Mail className="w-4 h-4 mr-2" />
                      Inscrever-se
                    </>
                  )}
                </Button>
              </div>
              <p className="text-xs text-ash-muted text-center">
                Sem spam. Cancele a qualquer momento.
              </p>
            </form>

            {/* Stat Badges */}
            <div className="flex flex-wrap justify-center gap-4 mt-6 pt-6 border-t border-charcoal-lighter/50">
              {[
                { icon: Users, value: '2.4K', label: 'Inscritos' },
                { icon: Mail, value: '3', label: 'Emails/Semana' },
                { icon: Activity, value: '98%', label: 'Taxa de Abertura' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-charcoal-light/60 border border-charcoal-lighter/40"
                >
                  <stat.icon className="w-3.5 h-3.5 text-ember" />
                  <span className="text-sm font-semibold text-ash">{stat.value}</span>
                  <span className="text-xs text-ash-muted">{stat.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

/* ================================================================
   FEATURE 1: SCROLL PROGRESS BAR
   ================================================================ */

function ScrollProgressBar() {
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      document.documentElement.style.setProperty('--scroll-width', `${scrollPercent}%`);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" />;
}

/* ================================================================
   FEATURE 2: QUICK STATS COMPARISON TABLE
   ================================================================ */

function ComparisonTable() {
  const comparisonData = [
    {
      feature: 'Mecanismo de Queima',
      lipt: '2% automático por swap',
      liptGood: true,
      defi: 'Nenhum',
      defiGood: false,
    },
    {
      feature: 'Staking APY',
      lipt: '42% ao ano',
      liptGood: true,
      defi: '12% ao ano',
      defiGood: false,
    },
    {
      feature: 'Rede',
      lipt: 'Polygon',
      liptGood: true,
      defi: 'Múltiplas',
      defiGood: null,
    },
    {
      feature: 'Auditoria',
      lipt: 'CertiK',
      liptGood: true,
      defi: 'Varia',
      defiGood: false,
    },
    {
      feature: 'Modelo de Oferta',
      lipt: 'Deflacionário',
      liptGood: true,
      defi: 'Inflacionário',
      defiGood: false,
    },
  ];

  return (
    <AnimatedSection>
      <div className="max-w-4xl mx-auto mt-16">
        <Card className="gradient-border-ember bg-charcoal-light/80 backdrop-blur-xl overflow-hidden">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-heading text-ember flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Comparativo Rápido
            </CardTitle>
            <CardDescription className="text-ash-muted">
              Veja como o LIPT Protocol se compara com a média do mercado DeFi
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-charcoal-lighter hover:bg-transparent">
                  <TableHead className="text-ash-muted font-semibold text-sm">Recurso</TableHead>
                  <TableHead className="text-center font-semibold text-sm">
                    <span className="text-ember">LIPT Protocol</span>
                  </TableHead>
                  <TableHead className="text-center font-semibold text-sm">
                    <span className="text-ash-muted">Média DeFi</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparisonData.map((row) => (
                  <TableRow key={row.feature} className="border-charcoal-lighter/50 hover:bg-charcoal-light/30">
                    <TableCell className="text-ash font-medium text-sm py-3.5">{row.feature}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-sm text-ash font-medium">{row.lipt}</span>
                        {row.liptGood === true && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                        {row.liptGood === null && <CircleDot className="w-4 h-4 text-ash-muted shrink-0" />}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        <span className="text-sm text-ash-muted">{row.defi}</span>
                        {row.defiGood === false && <XCircle className="w-4 h-4 text-red-400 shrink-0" />}
                        {row.defiGood === null && <CircleDot className="w-4 h-4 text-ash-muted shrink-0" />}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}

/* ================================================================
   FEATURE 3: TELEGRAM COMMUNITY WIDGET
   ================================================================ */

function TelegramCommunityWidget() {
  return (
    <div className="mt-6">
      <div className="relative">
        {/* Telegram bubble tail */}
        <div className="absolute -left-2 top-4 w-4 h-4 bg-[#2AABEE]/10 border-l border-b border-[#2AABEE]/20 rotate-45 rounded-sm" />
        <div className="glass-dark rounded-2xl p-5 border border-[#2AABEE]/20 hover:border-[#2AABEE]/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(42,171,238,0.1)]">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-[#2AABEE]/15 border border-[#2AABEE]/30 flex items-center justify-center">
              <TelegramIcon className="w-5 h-5 text-[#2AABEE]" />
            </div>
            <div>
              <p className="text-sm font-bold text-ash">Canal Oficial LIPT</p>
              <p className="text-xs text-ash-muted">@liptprotocol</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2AABEE] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2AABEE]" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#2AABEE]">Ao Vivo</span>
            </div>
          </div>

          {/* Message bubble */}
          <div className="bg-charcoal-light/60 rounded-xl rounded-tl-sm p-4 mb-4 border border-charcoal-lighter/30">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-full bg-ember/15 border border-ember/30 flex items-center justify-center">
                <span className="text-[10px] font-bold text-ember">L</span>
              </div>
              <span className="text-xs font-semibold text-ash">Admin LIPT</span>
              <span className="text-[10px] text-ash-muted">hoje às 14:32</span>
            </div>
            <p className="text-sm text-ash-muted leading-relaxed">
              🔥 <span className="text-ember font-semibold">Atualização da Comunidade:</span> O BurnEngine atingiu{' '}
              <span className="text-emerald-400 font-semibold">1.000.000 LIPT</span> queimados esta semana!{' '}
              O APY do Vault subiu para <span className="text-neon font-semibold">42%</span>.{' '}
              🚀 Não perca as próximas novidades — participe do sorteio de 50.000 LIPT!
            </p>
          </div>

          {/* Join button */}
          <Button className="w-full bg-[#2AABEE] hover:bg-[#229ED9] text-white font-semibold text-sm h-10 gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(42,171,238,0.3)]">
            <Send className="w-4 h-4" />
            Entrar no Telegram
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   FEATURE 4: ANIMATED SECURITY SCORE
   ================================================================ */

function SecurityScore() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);
  const [animatedScore, setAnimatedScore] = useState(0);
  const targetScore = 95;

  useEffect(() => {
    if (!isInView) return;
    let current = 0;
    const step = targetScore / 60;
    const interval = setInterval(() => {
      current += step;
      if (current >= targetScore) {
        setAnimatedScore(targetScore);
        clearInterval(interval);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, 25);
    return () => clearInterval(interval);
  }, [isInView]);

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <AnimatedSection>
      <div ref={ref} className="max-w-md mx-auto mt-16">
        <Card className="gradient-border-neon bg-charcoal-light/80 backdrop-blur-xl overflow-hidden">
          <CardContent className="p-8 flex flex-col items-center">
            {/* Circular progress */}
            <div className="relative w-36 h-36 mb-6">
              <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
                {/* Background circle */}
                <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                {/* Progress circle */}
                <circle
                  cx="60" cy="60" r="54" fill="none"
                  stroke="url(#score-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  className="transition-all duration-100 ease-linear"
                  style={{ filter: 'drop-shadow(0 0 8px rgba(130,71,229,0.5))' }}
                />
                <defs>
                  <linearGradient id="score-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#8247E5" />
                    <stop offset="50%" stopColor="#FF4D00" />
                    <stop offset="100%" stopColor="#8247E5" />
                  </linearGradient>
                </defs>
              </svg>
              {/* Score text in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
                <span className="text-3xl font-heading font-bold text-ash">{animatedScore}</span>
                <span className="text-xs text-ash-muted font-medium">/100</span>
              </div>
            </div>

            {/* Label */}
            <h3 className="font-heading text-lg font-bold text-ash mb-2">Pontuação de Segurança</h3>
            <p className="text-sm text-ash-muted text-center mb-5">
              Baseado em auditoria, código e transparência
            </p>

            {/* CertiK badge */}
            <div className="flex items-center gap-3 glass-dark rounded-xl px-4 py-3 border border-emerald-500/20">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-bold text-ash">Auditado pela CertiK</p>
                <p className="text-xs text-emerald-400 font-medium">Smart Contracts Verificados</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}

/* ================================================================
   FEATURE 5: PRICE ALERT COMPONENT
   ================================================================ */

function PriceAlertForm() {
  const [targetPrice, setTargetPrice] = useState('');
  const [direction, setDirection] = useState<'above' | 'below'>('above');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetPrice || !email) return;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setTargetPrice('');
      setEmail('');
      setDirection('above');
    }, 4000);
  };

  return (
    <Card className="glass-dark bg-charcoal-light/80 backdrop-blur-xl border border-charcoal-lighter/50">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-heading text-ember flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Alerta de Preço
        </CardTitle>
        <CardDescription className="text-ash-muted text-sm">
          Receba uma notificação quando o LIPT atingir o preço alvo
        </CardDescription>
      </CardHeader>
      <CardContent>
        {submitted ? (
          <div className="flex flex-col items-center gap-3 py-6">
            <div className="w-14 h-14 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-emerald-400" />
            </div>
            <p className="text-sm font-semibold text-ash">Alerta Configurado!</p>
            <p className="text-xs text-ash-muted text-center">
              Você será notificado quando LIPT {direction === 'above' ? 'ultrapassar' : 'ficar abaixo'} de ${targetPrice}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {/* Direction dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs text-ash-muted font-medium">Direção</label>
                <select
                  value={direction}
                  onChange={(e) => setDirection(e.target.value as 'above' | 'below')}
                  className="w-full h-10 rounded-lg bg-charcoal border border-charcoal-lighter text-ash text-sm px-3 focus:outline-none focus:border-ember focus:ring-1 focus:ring-ember/30 appearance-none cursor-pointer"
                >
                  <option value="above">Acima de</option>
                  <option value="below">Abaixo de</option>
                </select>
              </div>
              {/* Target price */}
              <div className="space-y-1.5">
                <label className="text-xs text-ash-muted font-medium">Preço Alvo (USD)</label>
                <Input
                  type="number"
                  value={targetPrice}
                  onChange={(e) => setTargetPrice(e.target.value)}
                  placeholder="0.001"
                  step="0.000001"
                  min="0"
                  className="bg-charcoal border-charcoal-lighter text-ash text-sm h-10 focus:border-ember focus:ring-ember/20"
                />
              </div>
            </div>
            {/* Email input */}
            <div className="space-y-1.5">
              <label className="text-xs text-ash-muted font-medium">Seu E-mail</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seu@email.com"
                className="bg-charcoal border-charcoal-lighter text-ash text-sm h-10 focus:border-ember focus:ring-ember/20"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-ember hover:bg-ember-light text-white font-semibold text-sm h-10 gap-2 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]"
            >
              <Bell className="w-4 h-4" />
              Configurar Alerta
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
}

/* ================================================================
   FEATURE: RECENT BURNS FEED
   ================================================================ */

function RecentBurnsFeed() {
  const [burns, setBurns] = useState<Array<{ id: number; txHash: string; amount: string; timeAgo: string }>>(() => {
    const initial = [
      { id: 1, txHash: '0x7a3F...e92D', amount: '12,450 LIPT', timeAgo: '2 min atrás' },
      { id: 2, txHash: '0x1bE8...f04A', amount: '8,320 LIPT', timeAgo: '5 min atrás' },
      { id: 3, txHash: '0x9cD2...a71B', amount: '23,100 LIPT', timeAgo: '8 min atrás' },
      { id: 4, txHash: '0x4fA6...c83E', amount: '5,780 LIPT', timeAgo: '12 min atrás' },
      { id: 5, txHash: '0x2eB1...d56F', amount: '15,900 LIPT', timeAgo: '15 min atrás' },
      { id: 6, txHash: '0x8hG3...b29C', amount: '31,200 LIPT', timeAgo: '20 min atrás' },
    ];
    return initial;
  });
  const idCounter = useRef(7);

  useEffect(() => {
    const randomTxHash = () => {
      const chars = '0123456789abcdefABCDEF';
      let hash = '0x';
      for (let i = 0; i < 4; i++) hash += chars[Math.floor(Math.random() * chars.length)];
      hash += '...';
      for (let i = 0; i < 4; i++) hash += chars[Math.floor(Math.random() * chars.length)];
      return hash;
    };
    const randomAmount = () => `${(Math.floor(Math.random() * 45000) + 1000).toLocaleString('pt-BR')} LIPT`;

    const interval = setInterval(() => {
      setBurns((prev) => {
        const newBurn = {
          id: idCounter.current++,
          txHash: randomTxHash(),
          amount: randomAmount(),
          timeAgo: 'agora',
        };
        const updated = [newBurn, ...prev.slice(0, 11)];
        return updated;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatedSection>
      <section className="relative py-16 sm:py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="glass-dark rounded-2xl p-6 sm:p-8 border border-charcoal-lighter/30">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-ember/15 border border-ember/30 flex items-center justify-center">
                  <Flame className="w-5 h-5 text-ember" />
                </div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-ash">Queimas Recentes</h3>
              </div>
              <LiveIndicator />
            </div>

            {/* Burns List */}
            <div className="max-h-80 overflow-y-auto custom-scrollbar space-y-1">
              {burns.map((burn, index) => (
                <div
                  key={burn.id}
                  className={cn(
                    'flex items-center justify-between py-2.5 px-3 rounded-lg text-sm transition-all duration-300',
                    index === 0 && 'bg-ember/5 border border-ember/10 animate-slide-up',
                    index !== 0 && index % 2 === 0 && 'bg-charcoal-light/30',
                  )}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-6 h-6 rounded-full bg-ember/10 flex items-center justify-center shrink-0">
                      <Flame className="w-3 h-3 text-ember" />
                    </div>
                    <span className="font-mono text-xs text-ash-muted truncate">{burn.txHash}</span>
                  </div>
                  <div className="flex items-center gap-4 shrink-0 ml-3">
                    <span className="text-ash font-semibold text-xs sm:text-sm">{burn.amount}</span>
                    <span className="text-ash-muted text-xs hidden sm:inline">{burn.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

/* ================================================================
   FEATURE: PROTOCOL STATS TICKER
   ================================================================ */

function ProtocolStatsTicker() {
  const tickerItems = [
    { icon: Database, label: 'Total Supply', value: '10B' },
    { icon: Activity, label: 'Em Circulação', value: '4.2B' },
    { icon: Flame, label: 'Queimados', value: '1M+' },
    { icon: Lock, label: 'Em Staking', value: '2.5B' },
    { icon: Users, label: 'Holders', value: '4.2K+' },
    { icon: ArrowRightLeft, label: 'Transações', value: '50K+' },
  ];

  return (
    <section className="relative overflow-hidden border-y border-charcoal-lighter">
      {/* Gradient borders top/bottom */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-neon/40 to-transparent" />
      <div className="bg-charcoal-light/30 py-3">
        <div className="max-w-6xl mx-auto flex items-center">
          {/* Live indicator */}
          <div className="shrink-0 hidden sm:flex items-center gap-2 mr-6 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Live</span>
          </div>
          <div className="flex whitespace-nowrap animate-[ticker-scroll_30s_linear_infinite] flex-1">
            {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
              <div key={index} className="inline-flex items-center gap-2 mx-6 sm:mx-8 shrink-0">
                <item.icon className="w-4 h-4 text-ember" />
                <span className="text-xs sm:text-sm text-ash-muted font-medium">{item.label}</span>
                <span className="text-xs sm:text-sm text-ember font-bold">{item.value}</span>
                <ChevronRight className="w-3 h-3 text-ember/30" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FEATURE: QUICK ACTIONS BAR (Mobile Only)
   ================================================================ */

function QuickActionsBar({ onConnectWallet }: { onConnectWallet: () => void }) {
  const actions = [
    { label: 'Swap', icon: ArrowRightLeft, color: 'text-ember hover:bg-ember/15 hover:text-ember-light border-ember/20' },
    { label: 'Stake', icon: Lock, color: 'text-neon hover:bg-neon/15 hover:text-neon-light border-neon/20' },
    { label: 'Earn', icon: Coins, color: 'text-ember hover:bg-ember/15 hover:text-ember-light border-ember/20' },
  ];

  return (
    <div className="fixed bottom-0 inset-x-0 z-50 sm:hidden">
      <div className="glass-dark/95 backdrop-blur-xl border-t border-charcoal-lighter/50 px-4 py-3">
        <div className="flex items-center justify-around gap-3">
          {actions.map((action) => (
            <button
              key={action.label}
              onClick={onConnectWallet}
              className={cn(
                'flex-1 flex flex-col items-center gap-1.5 py-2.5 px-3 rounded-xl border transition-all duration-200 active:scale-95',
                action.color
              )}
            >
              <action.icon className="w-5 h-5" />
              <span className="text-xs font-semibold">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Safe area spacer for iOS */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </div>
  );
}

/* ================================================================
   FEATURE: PROTOCOL NUMBERS SECTION
   ================================================================ */

function ProtocolStatCard({ icon: Icon, label, value, suffix, delay }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  suffix: string;
  delay: number;
}) {
  const formattedValue = useAnimatedCounter(value, 2500, '', suffix, 0);
  const displayValue = value >= 1_000_000_000
    ? `${(value / 1_000_000_000).toFixed(0)}B`
    : value >= 1_000_000
      ? `${(value / 1_000_000).toFixed(0)}M`
      : value >= 1_000
        ? `${(value / 1_000).toFixed(0)}K`
        : formattedValue;

  return (
    <AnimatedSection delay={delay}>
      <div className="glass-dark rounded-2xl p-5 sm:p-6 text-center border border-charcoal-lighter/30 hover:border-ember/20 transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,77,0,0.08)]">
        <div className="w-12 h-12 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center mx-auto mb-4">
          <Icon className="w-6 h-6 text-ember" />
        </div>
        <div className="text-2xl sm:text-3xl font-bold font-heading text-ember mb-2">
          {displayValue}
        </div>
        <div className="text-xs sm:text-sm text-ash-muted font-medium uppercase tracking-wider">
          {label}
        </div>
      </div>
    </AnimatedSection>
  );
}

function ProtocolNumbersSection() {
  const stats = [
    { icon: Database, label: 'Total Supply', value: 10_000_000_000, suffix: '' },
    { icon: Flame, label: 'Tokens Queimados', value: 1_000_000, suffix: '+' },
    { icon: ArrowRightLeft, label: 'Transações', value: 50_000, suffix: '+' },
    { icon: Rocket, label: 'Dias Online', value: 365, suffix: '+' },
  ];

  return (
    <AnimatedSection>
      <section className="relative py-20 sm:py-28 px-4">
        {/* Dot-grid background */}
        <div className="absolute inset-0 dot-grid-pattern opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-14">
            <Badge variant="outline" className="border-ember/30 text-ember mb-4 px-4 py-1.5 text-sm">
              <BarChart3 className="w-3.5 h-3.5 mr-1.5" />
              Métricas
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ash mb-4">
              Protocolo em{' '}
              <span className="bg-gradient-to-r from-ember to-neon bg-clip-text text-transparent">
                Números
              </span>
            </h2>
            <p className="text-ash-muted text-lg max-w-2xl mx-auto">
              Dados em tempo real do ecossistema LIPT Protocol.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <ProtocolStatCard
                key={stat.label}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                delay={index * 150}
              />
            ))}
          </div>
        </div>
      </section>
    </AnimatedSection>
  );
}

/* ================================================================
   FEATURE: TOKEN ALLOCATION BARS
   ================================================================ */

function TokenAllocationBars() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref);

  const allocations = [
    { label: 'Em Circulação', percentage: 42, color: 'bg-ember' },
    { label: 'The Vault', percentage: 25, color: 'bg-neon' },
    { label: 'The Forge', percentage: 15, color: 'bg-ember-light' },
    { label: 'Queimados', percentage: 10, color: 'bg-red-400' },
    { label: 'Reserva', percentage: 8, color: 'bg-purple-300' },
  ];

  return (
    <div ref={ref} className="mb-8">
      <h4 className="text-sm font-semibold text-ash uppercase tracking-wider mb-5">
        Distribuição de Tokens
      </h4>
      <div className="space-y-4">
        {allocations.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-ash-muted font-medium">{item.label}</span>
              <span className="text-ember font-bold">{item.percentage}%</span>
            </div>
            <div className="h-3 bg-charcoal rounded-full overflow-hidden">
              <div
                className={cn(
                  'h-full rounded-full transition-all duration-[1500ms] ease-out',
                  item.color
                )}
                style={{ width: isInView ? `${item.percentage}%` : '0%' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   FEATURE 1: LIQUIDITY POOL CARD
   ================================================================ */

function LiquidityPoolCard({ onConnectWallet }: { onConnectWallet: () => void }) {
  const poolStats = useMemo(() => [
    { icon: Database, label: 'TVL', value: '$128.456,78', color: 'text-ember' },
    { icon: TrendingUp, label: 'APY', value: '42,5%', color: 'text-neon' },
    { icon: Activity, label: 'Volume 24h', value: '$48.923,45', color: 'text-ash' },
  ], []);

  return (
    <AnimatedSection className="mt-10">
      <div className="glass-dark rounded-2xl border border-charcoal-lighter/50 overflow-hidden border-l-4 border-l-ember">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center">
                <Coins className="w-5 h-5 text-ember" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-ash">LIPT/USDT</h3>
                <p className="text-xs text-ash-muted">Pool de Liquidez Principal</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-neon/10 text-neon border-neon/20 text-xs">
              <Sparkles className="w-3 h-3 mr-1" />
              Ativo
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {poolStats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 p-3 rounded-xl bg-charcoal-light/50 border border-charcoal-lighter/30"
              >
                <div className="w-9 h-9 rounded-lg bg-charcoal-light border border-charcoal-lighter/50 flex items-center justify-center shrink-0">
                  <stat.icon className="w-4 h-4 text-ash-muted" />
                </div>
                <div>
                  <p className="text-xs text-ash-muted">{stat.label}</p>
                  <p className={cn('text-sm font-bold', stat.color)}>{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <Button
              onClick={onConnectWallet}
              className="bg-ember hover:bg-ember-light text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,77,0,0.3)]"
            >
              Ver Pool
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ================================================================
   FEATURE 2: ACTIVITY HEATMAP
   ================================================================ */

function ActivityHeatmap() {
  const days = useMemo(() => ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'], []);
  const periods = useMemo(() => ['00-06h', '06-12h', '12-18h', '18-24h'], []);

  const heatmapData = useState<number[][]>(() => {
    const data: number[][] = [];
    for (let d = 0; d < 7; d++) {
      const row: number[] = [];
      for (let p = 0; p < 4; p++) {
        row.push(Math.floor(Math.random() * 120));
      }
      data.push(row);
    }
    return data;
  })[0];

  const getColor = (value: number): string => {
    if (value < 15) return 'bg-charcoal-lighter/30';
    if (value < 35) return 'bg-ember/10';
    if (value < 60) return 'bg-ember/30';
    if (value < 85) return 'bg-ember/60';
    return 'bg-ember/90';
  };

  return (
    <AnimatedSection>
      <div className="glass-dark rounded-2xl border border-charcoal-lighter/50 overflow-hidden p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-ember" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-ash">Mapa de Atividade</h3>
            <p className="text-xs text-ash-muted">Últimos 7 dias</p>
          </div>
        </div>

        {/* Period labels top row */}
        <div className="flex gap-1.5 mb-1.5 pl-10">
          {periods.map((period) => (
            <div key={period} className="flex-1 text-center">
              <span className="text-[10px] text-ash-muted">{period}</span>
            </div>
          ))}
        </div>

        {/* Heatmap grid */}
        <div className="space-y-1.5">
          {days.map((day, dIdx) => (
            <div key={day} className="flex items-center gap-1.5">
              <span className="text-xs text-ash-muted w-10 text-right pr-1">{day}</span>
              {heatmapData[dIdx].map((value, pIdx) => (
                <div
                  key={`${dIdx}-${pIdx}`}
                  title={`${value} transações`}
                  className={cn(
                    'flex-1 aspect-square rounded-md transition-all duration-200 cursor-pointer',
                    getColor(value),
                    'hover:ring-2 hover:ring-ember/50 hover:scale-110'
                  )}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-end gap-2 mt-4">
          <span className="text-[10px] text-ash-muted">Menos</span>
          <div className="w-3 h-3 rounded-sm bg-charcoal-lighter/30" />
          <div className="w-3 h-3 rounded-sm bg-ember/10" />
          <div className="w-3 h-3 rounded-sm bg-ember/30" />
          <div className="w-3 h-3 rounded-sm bg-ember/60" />
          <div className="w-3 h-3 rounded-sm bg-ember/90" />
          <span className="text-[10px] text-ash-muted">Mais</span>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ================================================================
   FEATURE 3: TOP HOLDERS LIST
   ================================================================ */

function TopHoldersList() {
  const holders = useMemo(() => [
    { rank: 1, address: '0x1a2B3c4D5e6F7890AbCdEf1234567890aBcDeF12', balance: '48.2M LIPT', percentage: '4.82%' },
    { rank: 2, address: '0x9f8E7d6C5b4A3210fEdCbA9876543210FeDcBa98', balance: '35.7M LIPT', percentage: '3.57%' },
    { rank: 3, address: '0x2b3C4d5E6f7A8901BcDeF2345678901bCdEf2345', balance: '28.1M LIPT', percentage: '2.81%' },
    { rank: 4, address: '0x4d5E6f7A8b9C0123DeFab3456789012dEfAb3456', balance: '22.4M LIPT', percentage: '2.24%' },
    { rank: 5, address: '0x6f7A8b9C0d1E2345EfBcD4567890123eFbCd4567', balance: '18.9M LIPT', percentage: '1.89%' },
  ], []);

  const truncateAddress = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <AnimatedSection>
      <div className="glass-dark rounded-2xl border border-charcoal-lighter/50 overflow-hidden">
        <div className="p-6 pb-4">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-ember/10 border border-ember/20 flex items-center justify-center">
              <Users className="w-5 h-5 text-ember" />
            </div>
            <h3 className="font-heading text-lg font-bold text-ash">Top Holders</h3>
          </div>
          <p className="text-xs text-ash-muted ml-[52px]">Maiores detentores do token LIPT</p>
        </div>

        <div className="px-6 pb-4">
          <div className="space-y-2">
            {holders.map((holder) => (
              <div
                key={holder.rank}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-xl border transition-all duration-200',
                  holder.rank === 1
                    ? 'bg-ember/5 border-ember/20 hover:bg-ember/10'
                    : 'bg-charcoal-light/30 border-charcoal-lighter/30 hover:bg-charcoal-light/50'
                )}
              >
                {/* Rank */}
                <div
                  className={cn(
                    'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold shrink-0',
                    holder.rank === 1
                      ? 'bg-ember/20 text-ember'
                      : holder.rank === 2
                      ? 'bg-ember/10 text-ember/70'
                      : 'bg-charcoal-light text-ash-muted'
                  )}
                >
                  {holder.rank <= 3 ? (
                    holder.rank === 1 ? '🥇' : holder.rank === 2 ? '🥈' : '🥉'
                  ) : (
                    <span>#{holder.rank}</span>
                  )}
                </div>

                {/* Address */}
                <div className="flex-1 min-w-0">
                  <p className={cn(
                    'text-sm font-mono',
                    holder.rank === 1 ? 'text-ember' : 'text-ash'
                  )}>
                    {truncateAddress(holder.address)}
                  </p>
                </div>

                {/* Balance */}
                <div className="text-right shrink-0">
                  <p className={cn(
                    'text-sm font-bold',
                    holder.rank === 1 ? 'text-ember' : 'text-ash'
                  )}>
                    {holder.balance}
                  </p>
                  <p className="text-[10px] text-ash-muted">{holder.percentage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer link */}
        <div className="px-6 pb-5 flex justify-center">
          <button
            className="inline-flex items-center gap-1.5 text-xs text-ember hover:text-ember-light transition-colors font-medium"
          >
            <ExternalLink className="w-3 h-3" />
            Ver no Polygonscan
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ================================================================
   FEATURE 4: GAS TRACKER
   ================================================================ */

function GasTracker() {
  const gasData = useState(() => {
    const base = Math.floor(Math.random() * 60) + 15;
    return {
      low: { label: 'Baixo', gwei: Math.max(15, base - 20), emoji: '🟢', color: 'text-emerald-400', borderColor: 'border-emerald-400/30', bgColor: 'bg-emerald-400/5' },
      medium: { label: 'Médio', gwei: base, emoji: '🟡', color: 'text-yellow-400', borderColor: 'border-yellow-400/30', bgColor: 'bg-yellow-400/5' },
      high: { label: 'Alto', gwei: Math.min(90, base + 20), emoji: '🔴', color: 'text-red-400', borderColor: 'border-red-400/30', bgColor: 'bg-red-400/5' },
      activeTier: base < 30 ? 'low' : base <= 50 ? 'medium' : 'high',
    };
  })[0];

  const operations = useMemo(() => [
    { name: 'Swap', cost: '$0,01', icon: ArrowRightLeft },
    { name: 'Aprovação', cost: '$0,05', icon: CheckCircle2 },
    { name: 'Stake', cost: '$0,03', icon: Shield },
  ], []);

  return (
    <AnimatedSection>
      <div className="glass-dark rounded-2xl border border-charcoal-lighter/50 overflow-hidden p-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 flex items-center justify-center">
            <Zap className="w-5 h-5 text-neon" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-ash">Gas Tracker</h3>
            <p className="text-xs text-ash-muted">Polygon Mainnet</p>
          </div>
          <LiveIndicator />
        </div>

        {/* Gas tiers */}
        <div className="grid grid-cols-3 gap-2 mb-5">
          {(['low', 'medium', 'high'] as const).map((tier) => {
            const t = gasData[tier];
            const isActive = gasData.activeTier === tier;
            return (
              <div
                key={tier}
                className={cn(
                  'p-3 rounded-xl border text-center transition-all duration-200',
                  isActive
                    ? `${t.borderColor} ${t.bgColor} ring-1 ring-current`
                    : 'border-charcoal-lighter/30 bg-charcoal-light/30'
                )}
              >
                <div className="text-lg mb-0.5">{t.emoji}</div>
                <p className={cn('text-xs font-bold', isActive ? t.color : 'text-ash-muted')}>
                  {t.label}
                </p>
                <p className={cn('text-sm font-bold', isActive ? t.color : 'text-ash')}>
                  {t.gwei}
                  <span className="text-[10px] font-normal text-ash-muted ml-0.5">gwei</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Estimated costs */}
        <div className="space-y-2">
          <p className="text-xs text-ash-muted font-medium uppercase tracking-wider mb-2">Custos Estimados</p>
          {operations.map((op) => (
            <div
              key={op.name}
              className="flex items-center justify-between p-2.5 rounded-lg bg-charcoal-light/30 border border-charcoal-lighter/30"
            >
              <div className="flex items-center gap-2">
                <op.icon className="w-3.5 h-3.5 text-ash-muted" />
                <span className="text-sm text-ash">{op.name}</span>
              </div>
              <span className="text-sm font-bold text-neon">{op.cost}</span>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

/* ================================================================
   FEATURE 5: TEAM SECTION
   ================================================================ */

function TeamSection() {
  const teamMembers = useMemo(() => [
    {
      name: 'André Lima',
      role: 'CEO & Fundador',
      bio: 'Visionário DeFi com mais de 8 anos de experiência em blockchain e finanças descentralizadas.',
      initials: 'AL',
      gradient: 'from-ember via-orange-600 to-amber-500',
      roleIcon: Crown,
      expertise: ['DeFi Strategy', 'Tokenomics', 'DAO Governance'],
      socials: { twitter: '#', linkedin: '#' },
    },
    {
      name: 'Mariana Costa',
      role: 'CTO & Lead Dev',
      bio: 'Engenheira de smart contracts especializada em Solidity, com foco em segurança e auditoria.',
      initials: 'MC',
      gradient: 'from-neon via-purple-600 to-violet-500',
      roleIcon: Code2,
      expertise: ['Solidity', 'Smart Contracts', 'Security Audits'],
      socials: { twitter: '#', linkedin: '#' },
    },
    {
      name: 'Rafael Oliveira',
      role: 'Head de Comunidade',
      bio: 'Estrategista de crescimento comunitário, conectando projetos Web3 a milhares de usuários.',
      initials: 'RO',
      gradient: 'from-purple-500 via-fuchsia-500 to-pink-500',
      roleIcon: Users,
      expertise: ['Community Growth', 'Web3 Marketing', 'Partnerships'],
      socials: { twitter: '#', linkedin: '#' },
    },
  ], []);

  return (
    <section id="equipe" className="relative py-20 sm:py-28 px-4">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-60 h-60 bg-ember/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-neon/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="border-ember/30 text-ember mb-4 px-4 py-1.5 text-sm">
            <Users className="w-3.5 h-3.5 mr-1.5" />
            Equipe
          </Badge>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ash mb-4">
            <span className="bg-gradient-to-r from-ember via-ember-light to-neon bg-clip-text text-transparent">
              Nossa Equipe
            </span>
          </h2>
          <p className="text-ash-muted text-lg max-w-2xl mx-auto">
            Conheça as mentes por trás do LIPT Protocol. Paixão por DeFi, inovação e transparência.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {teamMembers.map((member, idx) => {
            const RoleIcon = member.roleIcon;
            return (
              <AnimatedSection key={member.name} delay={idx * 150}>
                <div className="glass-dark rounded-2xl border border-charcoal-lighter/50 overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,77,0,0.12)] hover:border-ember/20 group">
                  {/* Gradient top bar */}
                  <div className={cn('h-1 w-full bg-gradient-to-r', member.gradient)} />

                  <div className="p-6 sm:p-8 text-center">
                    {/* Avatar with gradient ring */}
                    <div className="relative mx-auto mb-5">
                      <div className={cn(
                        'absolute -inset-1 rounded-full bg-gradient-to-r opacity-50 blur-sm group-hover:opacity-80 group-hover:blur-md transition-all duration-500',
                        member.gradient
                      )} />
                      <div className={cn(
                        'relative w-24 h-24 rounded-full bg-gradient-to-br flex items-center justify-center text-2xl font-bold text-white shadow-lg transition-transform duration-300 group-hover:scale-105',
                        member.gradient
                      )}>
                        {member.initials}
                      </div>
                      {/* Role icon badge */}
                      <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-charcoal border-2 border-charcoal-lighter flex items-center justify-center shadow-lg">
                        <RoleIcon className="w-4 h-4 text-ember" />
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h3 className="font-heading text-lg font-bold text-ash mb-1">{member.name}</h3>
                    <p className="text-sm text-ember font-semibold mb-3">{member.role}</p>

                    {/* Bio */}
                    <p className="text-sm text-ash-muted leading-relaxed mb-5">{member.bio}</p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap justify-center gap-1.5 mb-5">
                      {member.expertise.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-charcoal-light text-xs text-ash-muted border border-charcoal-lighter/50 hover:border-ember/30 hover:text-ember transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center justify-center gap-2 pt-4 border-t border-charcoal-lighter/30">
                      <a
                        href={member.socials.twitter}
                        className="w-8 h-8 rounded-lg bg-charcoal-light border border-charcoal-lighter/50 flex items-center justify-center text-ash-muted hover:text-ember hover:border-ember/30 hover:bg-ember/10 hover:shadow-[0_0_12px_rgba(255,77,0,0.15)] transition-all duration-300"
                        aria-label={`Twitter de ${member.name}`}
                      >
                        <TwitterXIcon className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={member.socials.linkedin}
                        className="w-8 h-8 rounded-lg bg-charcoal-light border border-charcoal-lighter/50 flex items-center justify-center text-ash-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10 hover:shadow-[0_0_12px_rgba(10,102,194,0.15)] transition-all duration-300"
                        aria-label={`LinkedIn de ${member.name}`}
                      >
                        <LinkedinIcon className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   NETWORK STATUS WIDGET
   ================================================================ */

function NetworkStatusWidget({ onChainData }: { onChainData?: OnChainData | null }) {
  const [blockHeight, setBlockHeight] = useState(0);
  const [gasPrice, setGasPrice] = useState(0);
  const [tps, setTps] = useState(58);

  // Use real on-chain data when available
  useEffect(() => {
    if (onChainData?.network) {
      setBlockHeight(onChainData.network.blockNumber);
      setGasPrice(onChainData.network.gasPrice);
    }
  }, [onChainData]);

  // Simulate small fluctuations for visual effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (onChainData?.network) {
        setBlockHeight(prev => prev + 1);
        setGasPrice(prev => {
          const base = onChainData!.network!.gasPrice;
          return base + Math.floor(Math.random() * 10) - 5;
        });
      } else {
        // Fallback simulation
        setBlockHeight(prev => prev + 1);
        setGasPrice(30 + Math.floor(Math.random() * 20));
      }
      setTps(50 + Math.floor(Math.random() * 20));
    }, 12000);

    return () => clearInterval(interval);
  }, [onChainData]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="glass-dark rounded-xl p-4 flex flex-wrap items-center justify-between gap-4 border border-charcoal-lighter/30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#8247E5]/15 border border-[#8247E5]/30 flex items-center justify-center">
            <Hexagon className="w-4 h-4 text-[#8247E5]" />
          </div>
          <div>
            <p className="text-xs text-ash-muted font-medium uppercase tracking-wider">Polygon Mainnet</p>
            <p className="text-sm text-emerald-400 font-semibold flex items-center gap-1">
              <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span></span>
              Operacional
            </p>
          </div>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <div className="text-center">
            <p className="text-ash-muted text-xs">Bloco</p>
            <p className="text-ash font-mono font-semibold">{blockHeight.toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-ash-muted text-xs">Gas</p>
            <p className="text-ash font-mono font-semibold">{gasPrice} Gwei</p>
          </div>
          <div className="text-center">
            <p className="text-ash-muted text-xs">TPS</p>
            <p className="text-ash font-mono font-semibold">~{tps}</p>
          </div>
          <div className="hidden sm:block text-center">
            <p className="text-ash-muted text-xs">Finalidade</p>
            <p className="text-ash font-mono font-semibold">&lt;2s</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   EARNINGS CALCULATOR
   ================================================================ */

function EarningsCalculator({ onConnectWallet }: { onConnectWallet: () => void }) {
  const [liptAmount, setLiptAmount] = useState('10000');
  const [stakeDuration, setStakeDuration] = useState(30);
  const apy = 42;
  const pricePerLipt = 0.000595;

  const calculate = useCallback(() => {
    const lipt = parseFloat(liptAmount) || 0;
    const months = stakeDuration;
    // Compound interest: A = P(1 + r/n)^(nt) where r = 0.42, n = 12, t = months/12
    const monthlyRate = apy / 100 / 12;
    const totalLipt = lipt * Math.pow(1 + monthlyRate, months);
    const earned = totalLipt - lipt;
    const earnedUsd = earned * pricePerLipt;
    const multiplier = 1 + (months > 90 ? 0.5 : months > 30 ? 0.2 : 0);
    const effectiveApy = apy * multiplier;

    return { totalLipt, earned, earnedUsd, multiplier, effectiveApy };
  }, [liptAmount, stakeDuration]);

  const result = calculate();

  return (
    <Card className="glass-card-enhanced overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-heading text-[#8247E5] flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Calculadora de Rendimento
        </CardTitle>
        <CardDescription className="text-ash-muted text-sm">
          Simule seus ganhos no The Vault
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-ash-muted font-medium">Quantidade de LIPT</label>
          <div className="relative">
            <Input type="number" value={liptAmount} onChange={(e) => setLiptAmount(e.target.value)}
              className="bg-charcoal border-charcoal-lighter text-ash text-base font-semibold pr-16 h-12 focus:border-[#8247E5] focus:ring-[#8247E5]/20"
              placeholder="0" min="0" />
            <Badge className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#8247E5]/20 text-[#8247E5] border-[#8247E5]/30 text-sm px-3 py-1">LIPT</Badge>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between">
            <label className="text-sm text-ash-muted font-medium">Período</label>
            <span className="text-sm text-[#8247E5] font-semibold">{stakeDuration} dias</span>
          </div>
          <div className="flex gap-2">
            {[7, 30, 90, 180, 365].map(d => (
              <button key={d} onClick={() => setStakeDuration(d)}
                className={cn("flex-1 py-2 rounded-lg text-xs font-semibold transition-all",
                  stakeDuration === d ? "bg-[#8247E5] text-white" : "bg-charcoal-light text-ash-muted hover:text-ash hover:bg-charcoal-lighter/50")}>
                {d}d
              </button>
            ))}
          </div>
        </div>
        <Separator className="bg-charcoal-lighter" />
        <div className="grid grid-cols-2 gap-3">
          <div className="glass-dark rounded-lg p-3 text-center">
            <p className="text-xs text-ash-muted mb-1">Rendimento</p>
            <p className="text-lg font-bold text-[#8247E5]">+{result.earned.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</p>
            <p className="text-xs text-ash-muted">LIPT</p>
          </div>
          <div className="glass-dark rounded-lg p-3 text-center">
            <p className="text-xs text-ash-muted mb-1">Em USD</p>
            <p className="text-lg font-bold text-emerald-400">${result.earnedUsd.toLocaleString('pt-BR', { maximumFractionDigits: 2 })}</p>
            <p className="text-xs text-ash-muted">estimado</p>
          </div>
        </div>
        {result.multiplier > 1 && (
          <div className="text-center text-xs text-ember bg-ember/10 rounded-lg py-2 px-3 border border-ember/20">
            Multiplicador de {result.multiplier}x ativo! APY efetivo: {result.effectiveApy}%
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-2">
        <Button className="w-full bg-[#8247E5] hover:bg-[#9B6EF5] text-white font-semibold h-11" onClick={onConnectWallet}>
          Stake Agora <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}

/* ================================================================
   LANGUAGE TOGGLE (PT/EN)
   ================================================================ */

function LanguageToggle() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');
  return (
    <button onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
      className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-ash-muted hover:text-ember hover:bg-ember/10 border border-charcoal-lighter/50 transition-all duration-200"
      aria-label={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}>
      <Globe className="w-3.5 h-3.5" />
      {lang === 'pt' ? 'EN' : 'PT'}
    </button>
  );
}

/* ================================================================
   LIVE STATS HOOK - fetches from /api/stats
   ================================================================ */

function useLiveStats() {
  const [stats, setStats] = useState<LiveStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/stats');
        if (res.ok) {
          const data = await res.json();
          setStats({
            marketCap: data.marketCap,
            totalBurned: data.totalBurned,
            holders: data.holders,
            price: data.price,
            circulating: data.circulating,
            totalSupply: data.totalSupply,
            stakingAPY: data.stakingAPY,
            burnRate: data.burnRate,
            volume24h: data.volume24h,
            priceChange24h: data.priceChange24h,
            transactions24h: data.transactions24h,
            liquidityUSD: data.liquidityUSD,
            source: data.source,
          });
        }
      } catch (e) {
        console.error('[Stats] Failed to fetch:', e);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return { stats, loading };
}

/* ================================================================
   LIVE ON-CHAIN DATA HOOK - fetches from /api/onchain
   ================================================================ */

function useOnChainData() {
  const [data, setData] = useState<OnChainData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/onchain');
        if (res.ok) {
          const json = await res.json();
          setData({
            network: json.network,
            token: json.token,
          });
        }
      } catch {
        // Silent fail
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000); // Refresh every 15s
    return () => clearInterval(interval);
  }, []);

  return data;
}


/* ================================================================
   DEMO MODE BANNER COMPONENT
   ================================================================ */

function DemoModeBanner({ source }: { source?: string }) {
  const [dismissed, setDismissed] = useState(false);

  const isDismissed = useMemo(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('lipt-demo-banner-dismissed') === 'true';
  }, []);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (source === 'demo' && !isDismissed) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [source, isDismissed]);

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setDismissed(true);
    try {
      localStorage.setItem('lipt-demo-banner-dismissed', 'true');
    } catch {
      // localStorage unavailable
    }
  }, []);

  if (!visible) return null;

  return (
    <div className="relative bg-amber-500/10 border-b border-amber-500/20 px-4 py-2.5">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <span className="text-lg shrink-0">📊</span>
          <p className="text-sm text-amber-200 font-medium truncate">
            Modo Demo — Dados ilustrativos. Para dados reais, configure o endereço do contrato no{' '}
            <a href="/admin/contracts-config" className="underline text-amber-300 hover:text-amber-100 transition-colors">
              painel admin
            </a>.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/admin/contracts-config"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-200 text-xs font-semibold hover:bg-amber-500/30 hover:text-amber-100 transition-all duration-200"
          >
            <Settings className="w-3 h-3" />
            Configurar
          </a>
          <button
            onClick={handleDismiss}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-amber-300 hover:text-amber-100 hover:bg-amber-500/20 transition-all duration-200"
            aria-label="Fechar aviso"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   TOKEN EXPLORER LINKS COMPONENT
   ================================================================ */

function TokenExplorerLinks({ contractAddress }: { contractAddress?: string }) {
  const address = contractAddress && contractAddress !== '0x0' && contractAddress !== ''
    ? contractAddress
    : '0x1a2B3c4D5e6F7890AbCdEf1234567890aBcDeF00';

  const links = useMemo(() => [
    {
      name: 'Polygonscan',
      href: `https://polygonscan.com/token/${address}`,
      color: '#8247E5',
      hoverText: 'hover:text-[#8247E5] hover:border-[#8247E5]/30 hover:bg-[#8247E5]/10 hover:shadow-[0_0_15px_rgba(130,71,229,0.2)]',
    },
    {
      name: 'QuickSwap',
      href: `https://app.quickswap.exchange/#/swap?outputCurrency=${address}`,
      color: '#FF4D00',
      hoverText: 'hover:text-[#FF4D00] hover:border-[#FF4D00]/30 hover:bg-[#FF4D00]/10 hover:shadow-[0_0_15px_rgba(255,77,0,0.2)]',
    },
    {
      name: 'CoinGecko',
      href: `https://www.coingecko.com/en/coins/polygon-pos`,
      color: '#8DC63F',
      hoverText: 'hover:text-[#8DC63F] hover:border-[#8DC63F]/30 hover:bg-[#8DC63F]/10 hover:shadow-[0_0_15px_rgba(141,198,63,0.2)]',
    },
  ], [address]);

  return (
    <div className="flex items-center justify-center gap-2 mt-6">
      <span className="text-xs text-ash-muted mr-1">Explorar em:</span>
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          title={link.name}
          className={cn(
            'w-8 h-8 rounded-lg bg-charcoal-light border border-charcoal-lighter flex items-center justify-center text-ash-muted transition-all duration-300',
            link.hoverText
          )}
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      ))}
      {links.map((link) => (
        <span
          key={`label-${link.name}`}
          className="sr-only"
        >
          {link.name}
        </span>
      ))}
    </div>
  );
}

/* ================================================================
   QUICK ACTIONS (FLOATING PANEL) COMPONENT
   ================================================================ */

function QuickActions() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = useMemo(() => [
    {
      label: 'Ver Contrato',
      emoji: '📊',
      href: 'https://polygonscan.com/token/0x1a2B3c4D5e6F7890AbCdEf1234567890aBcDeF00',
      external: true,
    },
    {
      label: 'Alertas de Preço',
      emoji: '🔔',
      href: '#como-funciona',
      external: false,
    },
    {
      label: 'Telegram',
      emoji: '💬',
      href: '#',
      external: true,
    },
    {
      label: 'Topo',
      emoji: '⬆️',
      href: '#hero',
      external: false,
    },
  ], []);

  const handleAction = useCallback((action: { href: string; external: boolean }) => {
    setIsOpen(false);
    if (action.external) {
      window.open(action.href, '_blank', 'noopener,noreferrer');
    } else {
      const target = document.querySelector(action.href);
      if (target) {
        const offset = 80;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: targetPosition, behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-end gap-3">
      {/* Expanded actions panel */}
      <div
        className={cn(
          'flex flex-col gap-2 transition-all duration-300 origin-bottom-left',
          isOpen
            ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        )}
      >
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={() => handleAction(action)}
            className="flex items-center gap-2.5 pl-3 pr-4 py-2.5 rounded-xl glass-dark border border-charcoal-lighter/50 text-sm text-ash font-medium hover:bg-charcoal-light/60 hover:border-ember/20 transition-all duration-200 shadow-lg shadow-black/20 whitespace-nowrap hover:shadow-[0_0_20px_rgba(255,77,0,0.1)]"
          >
            <span className="text-base">{action.emoji}</span>
            <span>{action.label}</span>
            {action.external && <ExternalLink className="w-3 h-3 text-ash-muted" />}
          </button>
        ))}
      </div>

      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 active:scale-95',
          isOpen
            ? 'bg-charcoal border border-charcoal-lighter text-ash rotate-45'
            : 'bg-ember/90 hover:bg-ember text-white shadow-ember/30 hover:shadow-[0_0_30px_rgba(255,77,0,0.4)]'
        )}
        aria-label={isOpen ? 'Fechar ações rápidas' : 'Abrir ações rápidas'}
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <ChevronUp className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}

/* ================================================================
   AUDIT BADGE COMPONENT
   ================================================================ */

function AuditBadge() {
  return (
    <div className="flex justify-center">
      <a
        href="#"
        className="group relative block"
      >
        {/* Gradient border ring */}
        <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-ember via-amber-400 to-neon animate-[spin-slow_8s_linear_infinite]">
          <div className="rounded-2xl bg-charcoal px-8 py-6 flex flex-col items-center gap-4 transition-all duration-300 group-hover:bg-charcoal-light/80">
            {/* Shield icon */}
            <div className="relative">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-ember/15 to-neon/15 border border-ember/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-10 h-10 text-ember group-hover:text-neon transition-colors duration-300" />
              </div>
              <div className="absolute inset-0 rounded-2xl bg-ember/10 blur-xl group-hover:bg-ember/20 transition-all duration-500 pointer-events-none" />
            </div>

            {/* Text */}
            <div className="text-center">
              <h3 className="font-heading text-lg font-bold text-ash mb-1">Auditoria CertiK</h3>
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 mb-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-xs font-semibold text-amber-300">Em Andamento</span>
              </div>
              <p className="text-xs text-ash-muted max-w-[250px]">
                Smart contracts estão sendo auditados pela CertiK para garantir máxima segurança.
              </p>
            </div>

            {/* View report link */}
            <div className="flex items-center gap-1.5 text-xs text-ember group-hover:text-ember-light transition-colors">
              <ExternalLink className="w-3 h-3" />
              <span className="font-medium">Ver Relatório</span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

/* ================================================================
   MAIN PAGE COMPONENT
   ================================================================ */

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const launchDialog = useLaunchDialog();
  const { stats: liveStats } = useLiveStats();
  const onChainData = useOnChainData();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  // Use live stats or fallback to defaults
  const marketCapNum = liveStats?.marketCap ? parseFloat(liveStats.marketCap) : DEFAULT_STATS.marketCap;
  const totalBurnedNum = liveStats?.totalBurned ? parseFloat(liveStats.totalBurned) : DEFAULT_STATS.totalBurned;
  const holdersNum = liveStats?.holders || DEFAULT_STATS.holders;
  const livePrice = liveStats?.price ? parseFloat(liveStats.price) : DEFAULT_STATS.liptPrice;

  const marketCap = useAnimatedCounter(marketCapNum, 2500, '$', '', 0);
  const totalBurned = useAnimatedCounter(totalBurnedNum, 2500, '', '', 0);
  const holders = useAnimatedCounter(holdersNum, 2500, '', '', 0);

  return (
    <div className="min-h-screen bg-charcoal text-ash overflow-x-hidden">
      {/* ==============================================================
          DEMO MODE BANNER (shows only when data source is demo)
          ============================================================== */}
      <DemoModeBanner source={liveStats?.source} />

      {/* ==============================================================
          NAVIGATION BAR
          ============================================================== */}
      <NavBar onConnectWallet={() => launchDialog.setOpen(true)} />

      {/* ==============================================================
          SCROLL PROGRESS BAR
          ============================================================== */}
      <ScrollProgressBar />

      {/* ==============================================================
          FLOATING STATS BAR (appears on scroll)
          ============================================================== */}
      <FloatingStatsBar liveStats={liveStats} />

      {/* ==============================================================
          SECTION 1: ANIMATED HERO
          ============================================================== */}
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center bg-hero-gradient bg-mesh-gradient fire-particles-container px-4 py-20 noise-overlay">
        <FireParticles />

        {/* Glow orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-ember/10 rounded-full blur-[120px] animate-ember-flicker" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neon/8 rounded-full blur-[100px] animate-ember-flicker animation-delay-400" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div
            className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
          >
            <div className="animate-float mx-auto mb-8">
              <LiptLogo className="w-24 h-24 sm:w-32 sm:h-32" />
            </div>
          </div>

          {/* Protocol Name */}
          <h1
            className={`font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight mb-4 animate-text-ember-glow transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <span className="bg-gradient-to-r from-ember via-ember-light to-neon bg-clip-text text-transparent">
              LIPT Protocol
            </span>
          </h1>

          {/* Tagline with Typing Effect */}
          <p
            className={`text-lg sm:text-xl md:text-2xl text-ash-muted font-light max-w-2xl mx-auto mb-8 transition-all duration-1000 delay-400 h-[2em] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <TypingText
              text="Onde o fogo da escassez forja o valor do futuro"
              speed={50}
              startDelay={1200}
            />
          </p>

          {/* Polygon Badge */}
          <div
            className={`mb-10 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Badge className="bg-neon/15 text-neon-light border border-neon/30 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-neon/25 transition-colors cursor-default">
              <CircleDot className="w-4 h-4 mr-2" />
              Polygon Mainnet
            </Badge>
          </div>

          {/* CTA Button */}
          <div
            className={`mb-16 transition-all duration-1000 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            <Button
                size="lg"
                className="bg-ember hover:bg-ember-light text-white font-bold text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,77,0,0.4)] hover:scale-105 active:scale-95 animate-ember-glow"
                onClick={() => launchDialog.setOpen(true)}
              >
                Entrar no Protocolo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
          </div>

          {/* Live Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-1000 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {[
              { label: 'Market Cap', value: marketCap, icon: TrendingUp, showPlus: true },
              { label: 'Total Queimados', value: totalBurned, icon: Flame, showPlus: false },
              { label: 'Holders', value: holders, icon: Sparkles, showPlus: true },
              { label: 'Preço LIPT', value: `$${livePrice.toFixed(6)}`, icon: BarChart3, showPlus: false },
            ].map((stat) => (
              <div
                key={stat.label}
                className="glass-dark rounded-xl p-4 hover:bg-charcoal-light/50 transition-all duration-300 hover:border-ember/20"
              >
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <stat.icon className="w-4 h-4 text-ember" />
                  <span className="text-xs text-ash-muted font-medium uppercase tracking-wider">{stat.label}</span>
                </div>
                <div className="text-lg sm:text-xl font-bold font-heading text-ash flex items-center justify-center">
                  {stat.value}
                  {stat.showPlus && <PulsingPlus />}
                </div>
              </div>
            ))}
          </div>

          {/* Token Explorer Links */}
          <TokenExplorerLinks contractAddress={liveStats?.contractAddress} />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 rounded-full border-2 border-ember/30 flex items-start justify-center p-1.5">
            <div className="w-1.5 h-3 bg-ember rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* ==============================================================
          SECTION 6: MARQUEE TICKER (placed after hero for impact)
          ============================================================== */}
      <section className="relative bg-charcoal-light/50 border-y border-charcoal-lighter overflow-hidden py-4">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span key={index} className="mx-8 text-sm sm:text-base text-ash-muted font-medium flex items-center gap-2 shrink-0">
              {item}
              <ChevronRight className="w-3 h-3 text-ember/40" />
            </span>
          ))}
        </div>
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal-light/90 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal-light/90 to-transparent pointer-events-none z-10" />
      </section>

      {/* ============================================================== 
          PROTOCOL STATS TICKER 
          ============================================================== */}
      <ProtocolStatsTicker />
      <NetworkStatusWidget onChainData={onChainData} />

      <AnimatedSection>
      {/* ==============================================================
          SECTION 2: THREE GATEWAY CARDS
          ============================================================== */}
      <section id="ecossistema" className="relative py-20 sm:py-28 px-4 fire-particles-container">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-ember/30 text-ember mb-4 px-4 py-1.5 text-sm">
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
              Ecossistema
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ash mb-4">
              Três Portais,{' '}
              <span className="bg-gradient-to-r from-ember to-neon bg-clip-text text-transparent">
                Um Protocolo
              </span>
            </h2>
            <p className="text-ash-muted text-lg max-w-2xl mx-auto">
              Explore os três pilares do LIPT Protocol e descubra como o fogo da escassez forja valor real.
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {/* The Forge */}
            <Card className="gradient-border-ember bg-charcoal/80 backdrop-blur-sm card-hover-glow group hover:bg-charcoal-light/80 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,77,0,0.1)]">
              <CardContent className="relative z-10 p-6 sm:p-8">
                <div className="w-16 h-16 rounded-2xl bg-ember/10 border border-ember/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-ember/20 transition-all duration-300 icon-glow-ember">
                  <Flame className="w-8 h-8 text-ember" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-ash mb-3">
                  The Forge
                </h3>
                <p className="text-ash-muted leading-relaxed mb-6">
                  O motor de emissão do LIPT Protocol. Fornecer liquidez para forjar novos tokens com taxas
                  controladas algoritmicamente. A emissão decresce ao longo do tempo, garantindo escassez natural
                  e valorização progressiva.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-ember/10 text-ember border-ember/20 text-xs">
                    Mineração
                  </Badge>
                  <Badge variant="secondary" className="bg-ember/10 text-ember border-ember/20 text-xs">
                    Liquidez
                  </Badge>
                  <Badge variant="secondary" className="bg-ember/10 text-ember border-ember/20 text-xs">
                    Emissão Controlada
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  className="text-ember hover:text-ember-light hover:bg-ember/10 p-0 h-auto font-medium group/btn card-btn-slide"
                >
                  Explorar The Forge
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* The Vault */}
            <Card className="gradient-border-neon bg-charcoal/80 backdrop-blur-sm card-hover-neon group hover:bg-charcoal-light/80 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(130,71,229,0.1)]">
              <CardContent className="relative z-10 p-6 sm:p-8">
                <div className="w-16 h-16 rounded-2xl bg-neon/10 border border-neon/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-neon/20 transition-all duration-300 icon-glow-neon">
                  <Shield className="w-8 h-8 text-neon" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-ash mb-3">
                  The Vault
                </h3>
                <p className="text-ash-muted leading-relaxed mb-6">
                  O cofre de staking do protocolo. Deposite seus tokens LIPT e receba recompensas proporcionais
                  ao tempo de stake. Multiplicadores especiais recompensam holders de longo prazo com yields cada
                  vez maiores.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-neon/10 text-neon-light border-neon/20 text-xs">
                    Staking
                  </Badge>
                  <Badge variant="secondary" className="bg-neon/10 text-neon-light border-neon/20 text-xs">
                    Yield
                  </Badge>
                  <Badge variant="secondary" className="bg-neon/10 text-neon-light border-neon/20 text-xs">
                    Multiplicadores
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  className="text-neon hover:text-neon-light hover:bg-neon/10 p-0 h-auto font-medium group/btn card-btn-slide"
                >
                  Explorar The Vault
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>

            {/* The BurnEngine */}
            <Card className="gradient-border-ember bg-charcoal/80 backdrop-blur-sm card-hover-glow group hover:bg-charcoal-light/80 transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:shadow-[0_0_40px_rgba(255,77,0,0.1)]">
              <CardContent className="relative z-10 p-6 sm:p-8">
                <div className="w-16 h-16 rounded-2xl bg-ember/10 border border-ember/20 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-ember/20 transition-all duration-300 icon-glow-ember">
                  <Zap className="w-8 h-8 text-ember" />
                </div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-ash mb-3">
                  The BurnEngine
                </h3>
                <p className="text-ash-muted leading-relaxed mb-6">
                  O motor deflacionário do LIPT. Cada swap aplica 2% de taxa que é automaticamente queimada,
                  reduzindo a oferta total a cada transação. Mecanismo automático, transparente e permanente
                  de valorização.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <Badge variant="secondary" className="bg-ember/10 text-ember border-ember/20 text-xs">
                    Deflacionário
                  </Badge>
                  <Badge variant="secondary" className="bg-ember/10 text-ember border-ember/20 text-xs">
                    Auto-Burn
                  </Badge>
                  <Badge variant="secondary" className="bg-ember/10 text-ember border-ember/20 text-xs">
                    Swap Tax
                  </Badge>
                </div>
                <Button
                  variant="ghost"
                  className="text-ember hover:text-ember-light hover:bg-ember/10 p-0 h-auto font-medium group/btn card-btn-slide"
                >
                  Explorar BurnEngine
                  <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* LiquidityPoolCard - After Gateway Cards */}
        <LiquidityPoolCard onConnectWallet={() => launchDialog.setOpen(true)} />
      </section>
      </AnimatedSection>

      <AnimatedSection>
      {/* ==============================================================
          SECTION 3: LIVE TOKENOMICS DASHBOARD
          ============================================================== */}
      <section id="tokenomics" className="relative py-20 sm:py-28 px-4 bg-charcoal-gradient">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />
        {/* Dot grid pattern background for tokenomics */}
        <div className="absolute inset-0 dot-grid-pattern opacity-20" />

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-neon/30 text-neon mb-4 px-4 py-1.5 text-sm">
              <PieChart className="w-3.5 h-3.5 mr-1.5" />
              Tokenomics
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ash mb-4">
              Distribuição{' '}
              <span className="bg-gradient-to-r from-neon to-ember bg-clip-text text-transparent">
                ao Vivo
              </span>
            </h2>
            <p className="text-ash-muted text-lg max-w-2xl mx-auto">
              Transparência total. Veja exatamente como os 10 bilhões de LIPT são distribuídos.
            </p>
          </div>

          {/* Token Allocation Bars */}
          <TokenAllocationBars />

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            {/* Donut Chart */}
            <div className="glass-dark rounded-2xl p-6 sm:p-8">
              <DonutChart data={TOKENOMICS} />
              {/* Enhanced Legend */}
              <div className="mt-8 space-y-2">
                {TOKENOMICS.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-charcoal-light/50 transition-colors duration-200 group/legend cursor-default"
                  >
                    <div
                      className="w-3 h-3 rounded-full shrink-0 ring-2 ring-offset-1 ring-offset-charcoal transition-all duration-200 group-hover/legend:ring-2"
                      style={{ background: item.color, boxShadow: `0 0 0 2px #1A1A1B, 0 0 0 3px ${item.color}40` }}
                    />
                    <span className="text-sm text-ash-muted group-hover/legend:text-ash transition-colors flex-1">{item.name}</span>
                    <span className="text-sm font-bold text-ash">{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Cards + Progress Bars */}
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass-dark p-4">
                  <div className="text-xs text-ash-muted uppercase tracking-wider mb-1">Total Supply</div>
                  <div className="text-xl font-bold font-heading text-ash">10.000.000.000</div>
                  <div className="text-xs text-ash-muted mt-1">LIPT tokens</div>
                </Card>
                <Card className="glass-dark p-4">
                  <div className="text-xs text-ash-muted uppercase tracking-wider mb-1">Queimados</div>
                  <div className="text-xl font-bold font-heading text-ember">{TOKEN_STATS.burnedPercent}%</div>
                  <div className="text-xs text-ash-muted mt-1">da oferta total</div>
                </Card>
                <Card className="glass-dark p-4">
                  <div className="text-xs text-ash-muted uppercase tracking-wider mb-1">Em Circulação</div>
                  <div className="text-xl font-bold font-heading text-ash">4.2B</div>
                  <div className="text-xs text-ash-muted mt-1">LIPT tokens</div>
                </Card>
                <Card className="glass-dark p-4">
                  <div className="text-xs text-ash-muted uppercase tracking-wider mb-1">Em Staking</div>
                  <div className="text-xl font-bold font-heading text-neon">{TOKEN_STATS.stakedPercent}%</div>
                  <div className="text-xs text-ash-muted mt-1">no The Vault</div>
                </Card>
              </div>

              {/* Progress Bars */}
              <Card className="glass-dark p-6 space-y-5">
                <h4 className="text-sm font-semibold text-ash uppercase tracking-wider mb-4">
                  Progresso do Protocolo
                </h4>
                {[
                  { label: 'Queima Total', value: TOKEN_STATS.burnedPercent, color: 'bg-ember' },
                  { label: 'Tokens em Staking', value: TOKEN_STATS.stakedPercent, color: 'bg-neon' },
                  { label: 'Liquidez Forjada', value: 65, color: 'bg-ember-light' },
                  { label: 'Adoção da Comunidade', value: 42, color: 'bg-neon-light' },
                ].map((item) => (
                  <div key={item.label} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-ash-muted">{item.label}</span>
                      <span className="text-ash font-semibold">{item.value}%</span>
                    </div>
                    <div className="h-2.5 bg-charcoal rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full progress-striped ${item.color} transition-all duration-[2000ms] ease-out`}
                        style={{ width: `${item.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* ==============================================================
          FEATURE 2: COMPARISON TABLE (after tokenomics)
          ============================================================== */}
      <ComparisonTable />

      <AnimatedSection>
      {/* ==============================================================
          PRICE CHART
          ============================================================== */}
      <section id="preco" className="relative py-20 sm:py-28 px-4">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />
        <div className="max-w-4xl mx-auto">
          <PriceChart />
        </div>
      </section>
      </AnimatedSection>

      <AnimatedSection>
      {/* ==============================================================
          SECTION 4: HOW IT WORKS (with enhanced hover glow)
          ============================================================== */}
      <section id="como-funciona" className="relative py-20 sm:py-28 px-4">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-ember/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/3 right-0 w-60 h-60 bg-neon/5 rounded-full blur-[80px]" />
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="border-ember/30 text-ember mb-4 px-4 py-1.5 text-sm">
              <Coins className="w-3.5 h-3.5 mr-1.5" />
              Como Funciona
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ash mb-4">
              Comece em{' '}
              <span className="bg-gradient-to-r from-ember to-ember-light bg-clip-text text-transparent">
                3 Passos
              </span>
            </h2>
            <p className="text-ash-muted text-lg max-w-2xl mx-auto">
              Participar do LIPT Protocol é simples, rápido e seguro. Siga os passos abaixo.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '01',
                icon: Wallet,
                title: 'Conecte sua Carteira',
                description:
                  'Conecte sua wallet Polygon (MetaMask, Trust Wallet, etc.) ao protocolo com um clique. Sem cadastros, sem KYC, sem complicações.',
                color: 'ember',
              },
              {
                step: '02',
                icon: Flame,
                title: 'Swap ou Forge',
                description:
                  'Faça swaps USDT → LIPT no BurnEngine ou forneça liquidez no The Forge para minerar novos tokens com taxas competitivas.',
                color: 'neon',
              },
              {
                step: '03',
                icon: Coins,
                title: 'Earn & Burn',
                description:
                  'Stake seus LIPT no The Vault para multiplicar seus rendimentos enquanto o BurnEngine automaticamente queima tokens a cada transação.',
                color: 'ember',
              },
            ].map((item, index) => (
              <div key={item.step} className="relative group">
                {/* Connector line */}
                {index < 2 && (
                  <div className="hidden md:block absolute top-12 left-[calc(50%+40px)] w-[calc(100%-80px)] h-px bg-gradient-to-r from-charcoal-lighter to-charcoal-lighter" />
                )}
                <div className="glass-dark rounded-2xl p-6 sm:p-8 text-center hover:bg-charcoal-light/60 transition-all duration-500 hover:-translate-y-1 step-card-hover-glow">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold font-heading ${
                        item.color === 'ember'
                          ? 'bg-ember text-white'
                          : 'bg-neon text-white'
                      }`}
                    >
                      {item.step}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-20 h-20 rounded-full bg-charcoal-light border border-charcoal-lighter flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <item.icon
                      className={`w-10 h-10 ${
                        item.color === 'ember' ? 'text-ember' : 'text-neon'
                      }`}
                    />
                  </div>

                  <h3 className="font-heading text-lg sm:text-xl font-bold text-ash mb-3">
                    {item.title}
                  </h3>
                  <p className="text-ash-muted text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </AnimatedSection>

      {/* ==============================================================
          SECOND MARQUEE TICKER
          ============================================================== */}
      <section className="relative bg-charcoal-light/50 border-y border-charcoal-lighter overflow-hidden py-4">
        <div className="flex animate-marquee whitespace-nowrap" style={{ animationDirection: 'reverse' }}>
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
            <span key={index} className="mx-8 text-sm sm:text-base text-ash-muted font-medium flex items-center gap-2 shrink-0">
              {item}
              <ChevronRight className="w-3 h-3 text-neon/40" />
            </span>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-charcoal-light/90 to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-charcoal-light/90 to-transparent pointer-events-none z-10" />
      </section>

      <AnimatedSection delay={100}>
      {/* ==============================================================
          SECTION 7: TOOLS & FEATURES
          ============================================================== */}
      <section id="tools" className="relative py-20 sm:py-28 px-4">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />

        <div className="max-w-md mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="border-ember/30 text-ember mb-4 px-4 py-1.5 text-sm">
              <Zap className="w-3.5 h-3.5 mr-1.5" />
              Ferramentas
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-ash mb-4">
              Recursos do{' '}
              <span className="bg-gradient-to-r from-ember to-neon bg-clip-text text-transparent">
                Protocolo
              </span>
            </h2>
            <p className="text-ash-muted text-base">
              Acompanhe o protocolo em tempo real.
            </p>
          </div>

          <div className="mt-8">
            <ReferralCard />
          </div>

          {/* FEATURE 5: PRICE ALERT FORM */}
          <div className="mt-8">
            <PriceAlertForm />
          </div>

          {/* GasTracker */}
          <div className="mt-8">
            <GasTracker />
          </div>
        </div>
      </section>
      </AnimatedSection>

      <AnimatedSection>
      {/* ==============================================================
          TRANSACTION FEED WIDGET
          ============================================================== */}
      <section className="relative py-12 sm:py-16 px-4">
        <div className="max-w-md mx-auto relative z-10">
          <TransactionFeed />
        </div>
      </section>
      </AnimatedSection>

      <AnimatedSection>
      {/* ==============================================================
          SECTION 5: FAQ ACCORDION
          ============================================================== */}
      <section id="faq" className="relative py-20 sm:py-28 px-4 bg-charcoal-gradient">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon/30 to-transparent" />

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="border-neon/30 text-neon mb-4 px-4 py-1.5 text-sm">
              <Lock className="w-3.5 h-3.5 mr-1.5" />
              FAQ
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ash mb-4">
              Perguntas{' '}
              <span className="bg-gradient-to-r from-neon to-ember bg-clip-text text-transparent">
                Frequentes
              </span>
            </h2>
            <p className="text-ash-muted text-lg">
              Tire suas dúvidas sobre o LIPT Protocol.
            </p>
          </div>

          {/* Accordion */}
          <Card className="glass-dark overflow-hidden">
            <CardContent className="p-2 sm:p-4">
              <Accordion className="w-full">
                {FAQ_DATA.map((item, index) => (
                  <AccordionItem
                    key={index}
                    value={`faq-${index}`}
                    className="border-b border-charcoal-lighter last:border-0"
                  >
                    <AccordionTrigger className="text-left text-ash hover:text-ember hover:no-underline py-4 px-2 transition-colors duration-200 [&>svg]:text-ember">
                      <span className="font-medium text-sm sm:text-base pr-4">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-ash-muted text-sm sm:text-base leading-relaxed px-2 pb-4">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </section>
      </AnimatedSection>

      {/* ============================================================== 
          RECENT BURNS FEED 
          ============================================================== */}
      <RecentBurnsFeed />

      {/* TopHoldersList - After RecentBurnsFeed */}
      <TopHoldersList />

      <AnimatedSection>
      {/* ==============================================================
          SECTION 9: TOKEN BURN COUNTDOWN
          ============================================================== */}
      <section id="countdown" className="relative py-20 sm:py-28 px-4">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-ember/30 to-transparent" />

        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ember/8 rounded-full blur-[150px]" />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="border-ember/30 text-ember mb-4 px-4 py-1.5 text-sm">
              <Timer className="w-3.5 h-3.5 mr-1.5" />
              Próximo Burn
            </Badge>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-ash mb-4">
              Próximo Evento de{' '}
              <span className="bg-gradient-to-r from-ember to-ember-light bg-clip-text text-transparent text-glow-ember">
                Queima Automática
              </span>
            </h2>
            <p className="text-ash-muted text-lg max-w-2xl mx-auto">
              O BurnEngine executa queimas automáticas periódicas para reduzir a oferta total de LIPT, 
              aumentando a escassez e valorizando cada token.
            </p>
          </div>

          {/* Countdown Timer */}
          <BurnCountdown />

          {/* Burn Info Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-10">
            <Card className="glass-dark p-4 text-center">
              <div className="text-2xl mb-2">🔥</div>
              <div className="text-sm font-semibold text-ash">Auto-Burn</div>
              <div className="text-xs text-ash-muted mt-1">2% por swap</div>
            </Card>
            <Card className="glass-dark p-4 text-center">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-sm font-semibold text-ash">Permanente</div>
              <div className="text-xs text-ash-muted mt-1">Irreversível</div>
            </Card>
            <Card className="glass-dark p-4 text-center">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm font-semibold text-ash">Transparente</div>
              <div className="text-xs text-ash-muted mt-1">Na-chain</div>
            </Card>
          </div>
        </div>
      </section>
      </AnimatedSection>

      <AnimatedSection>
      {/* ==============================================================
          COMMUNITY / SOCIAL PROOF SECTION
          ============================================================== */}
      <CommunitySection />
      </AnimatedSection>

      {/* TeamSection - Between Community and Trust */}
      <TeamSection />

      <AnimatedSection>
      {/* ==============================================================
          TRUST / PARTNERS SECTION
          ============================================================== */}
      <TrustSection />

      {/* Audit Badge - inside Trust section area */}
      <div className="py-8">
        <AuditBadge />
      </div>
      </AnimatedSection>

      {/* ==============================================================
          PROTOCOL NUMBERS SECTION
          ============================================================== */}
      <ProtocolNumbersSection />

      {/* ==============================================================
          FEATURE 4: ANIMATED SECURITY SCORE (after trust section)
          ============================================================== */}
      <SecurityScore />

      <AnimatedSection>
      {/* ==============================================================
          ROADMAP TIMELINE SECTION
          ============================================================== */}
      <RoadmapTimeline />
      </AnimatedSection>

      {/* Cookie Consent Banner */}
      <CookieConsentBanner />

      {/* ==============================================================
          SECTION 8: FOOTER WITH MANIFESTO
          ============================================================== */}
      <footer className="relative bg-charcoal border-t border-charcoal-lighter">
        {/* Manifesto Section with enhanced styling */}
        <section className="py-16 sm:py-20 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-ember/10 rounded-full blur-[60px]" />
              <LiptLogo className="w-12 h-12 mx-auto relative" />
            </div>
            <h3 className="font-heading text-xl sm:text-2xl font-bold text-ash mb-6">
              Nosso <span className="bg-gradient-to-r from-ember to-neon bg-clip-text text-transparent">Manifesto</span>
            </h3>
            <div className="relative">
              <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-ember/30 to-transparent hidden sm:block" />
              <p className="text-ash-muted leading-relaxed text-base sm:text-lg italic pl-0 sm:pl-6">
                &ldquo;No LIPT Protocol, acreditamos que o verdadeiro valor nasce do fogo da escassez.
                Cada token queimado é uma promessa cumprida: a de que o futuro pertence àqueles que constroem
                com disciplina, transparência e visão. Não somos apenas mais um token — somos o arquétipo
                do que a DeFi pode se tornar quando a comunidade une forças em prol de um objetivo comum.
                Forjados na Polygon, alimentados pelo fogo, guiados pelo futuro.&rdquo;
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 mt-8">
              <div className="h-px flex-1 max-w-16 bg-gradient-to-r from-transparent to-ember/30" />
              <Flame className="w-4 h-4 text-ember/50" />
              <div className="h-px flex-1 max-w-16 bg-gradient-to-l from-transparent to-ember/30" />
            </div>
          </div>
        </section>

        <Separator className="bg-charcoal-lighter" />

        {/* Footer Links & Info */}
        <div className="py-8 sm:py-12 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
              {/* Brand */}
              <div className="sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-3 mb-4">
                  <LiptLogo className="w-10 h-10" />
                  <div>
                    <div className="font-heading font-bold text-ash text-lg">LIPT Protocol</div>
                    <div className="text-xs text-ash-muted">DeFi na Polygon</div>
                  </div>
                </div>
                <p className="text-ash-muted text-sm leading-relaxed mb-4">
                  O protocolo DeFi deflacionário onde o fogo da escassez forja o valor do futuro.
                </p>
                {/* Social Links */}
                <div className="flex gap-2">
                  <a
                    href="#"
                    className="w-9 h-9 rounded-lg bg-charcoal-light border border-charcoal-lighter flex items-center justify-center text-ash-muted hover:text-[#9CA3AF] hover:border-[#9CA3AF]/30 hover:bg-[#9CA3AF]/10 hover:shadow-[0_0_15px_rgba(156,163,175,0.2)] transition-all duration-300"
                    aria-label="Twitter/X"
                  >
                    <TwitterXIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-lg bg-charcoal-light border border-charcoal-lighter flex items-center justify-center text-ash-muted hover:text-[#3B99FC] hover:border-[#3B99FC]/30 hover:bg-[#3B99FC]/10 hover:shadow-[0_0_15px_rgba(59,153,252,0.2)] transition-all duration-300"
                    aria-label="Telegram"
                  >
                    <TelegramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-lg bg-charcoal-light border border-charcoal-lighter flex items-center justify-center text-ash-muted hover:text-[#5865F2] hover:border-[#5865F2]/30 hover:bg-[#5865F2]/10 hover:shadow-[0_0_15px_rgba(88,101,242,0.2)] transition-all duration-300"
                    aria-label="Discord"
                  >
                    <DiscordIcon className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-9 h-9 rounded-lg bg-charcoal-light border border-charcoal-lighter flex items-center justify-center text-ash-muted hover:text-[#0A66C2] hover:border-[#0A66C2]/30 hover:bg-[#0A66C2]/10 hover:shadow-[0_0_15px_rgba(10,102,194,0.2)] transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Protocol Links */}
              <div>
                <h4 className="font-semibold text-ash mb-4 text-sm uppercase tracking-wider">Protocolo</h4>
                <ul className="space-y-2.5">
                  {[
                    { name: 'The Forge (Mining)', href: '#ecossistema' },
                    { name: 'The Vault (Staking)', href: '#ecossistema' },
                    { name: 'BurnEngine', href: '#ecossistema' },
                    { name: 'Documentação', href: '#' },
                    { name: 'Auditoria CertiK', href: '#' },
                  ].map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-ash-muted hover:text-ember transition-colors text-sm flex items-center gap-1.5 group"
                      >
                        <span className="text-ember/40">›</span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Links */}
              <div>
                <h4 className="font-semibold text-ash mb-4 text-sm uppercase tracking-wider">Recursos</h4>
                <ul className="space-y-2.5">
                  {[
                    { name: 'Whitepaper', href: '#' },
                    { name: 'Roadmap', href: '#' },
                    { name: 'FAQ', href: '#faq' },
                    { name: 'Contrato Inteligente', href: '#' },
                    { name: 'Status da Rede', href: '#' },
                  ].map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-ash-muted hover:text-ember transition-colors text-sm flex items-center gap-1.5 group"
                      >
                        <span className="text-neon/40">›</span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Community & Telegram Widget */}
              <div>
                <h4 className="font-semibold text-ash mb-4 text-sm uppercase tracking-wider">Comunidade</h4>
                <div className="mb-4">
                  <Badge className="bg-neon/15 text-neon-light border border-neon/30 text-xs px-3 py-1">
                    <CircleDot className="w-3 h-3 mr-1.5" />
                    Powered by Polygon
                  </Badge>
                </div>

                {/* FEATURE 3: TELEGRAM COMMUNITY WIDGET */}
                <TelegramCommunityWidget />
              </div>
            </div>

            {/* Powered by Tech Stack */}
            <div className="mb-8 py-6 border-t border-charcoal-lighter/50">
              <div className="text-center mb-4">
                <span className="text-xs text-ash-muted uppercase tracking-widest font-medium">Powered by</span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                {[
                  { name: 'Polygon', color: '#8247E5', icon: Hexagon },
                  { name: 'Solidity', color: '#FF4D00', icon: Code2 },
                  { name: 'CertiK', color: '#2DB84B', icon: ShieldCheck },
                  { name: 'Chainlink', color: '#375BD2', icon: Database },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-charcoal-light/50 border border-charcoal-lighter/30 hover:border-charcoal-lighter transition-all duration-200"
                  >
                    <tech.icon className="w-4 h-4" style={{ color: tech.color }} />
                    <span className="text-xs font-medium text-ash-muted">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="pt-6 border-t border-charcoal-lighter flex flex-col items-center gap-4">
              <ContractInfo />
              <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-4">
                <p className="text-xs text-ash-muted">
                  © 2025-2026 LIPT Protocol. Todos os direitos reservados.
                </p>
                <div className="flex items-center gap-4">
                  <a href="#" className="text-xs text-ash-muted hover:text-ember transition-colors">
                    Termos de Uso
                  </a>
                  <span className="text-charcoal-lighter">·</span>
                  <a href="#" className="text-xs text-ash-muted hover:text-ember transition-colors">
                    Privacidade
                  </a>
                  <span className="text-charcoal-lighter">·</span>
                  <a href="#" className="text-xs text-ash-muted hover:text-ember transition-colors">
                    Auditoria
                  </a>
                  <span className="text-charcoal-lighter">·</span>
                  <a href="#" className="text-xs text-ash-muted hover:text-ember transition-colors">
                    Whitepaper
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <BackToTopButton />

      {/* Wallet Connect Dialog */}
      <LaunchAppDialogContent open={launchDialog.open} onOpenChange={launchDialog.setOpen} />

      {/* Inline keyframes and utility classes */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes pulse-plus {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.8); }
        }
        @keyframes ticker-scroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .step-card-hover-glow {
          transition: box-shadow 0.4s ease, border-color 0.4s ease;
        }
        .step-card-hover-glow:hover {
          box-shadow: 0 0 30px rgba(255,77,0,0.15), 0 0 60px rgba(130,71,229,0.08);
          border-color: rgba(255,77,0,0.2);
        }
      ` }} />

      {/* ==============================================================
          QUICK ACTIONS BAR (Mobile Only)
          ============================================================== */}
      <QuickActionsBar onConnectWallet={() => launchDialog.setOpen(true)} />

      {/* ==============================================================
          QUICK ACTIONS FLOATING PANEL (Desktop)
          ============================================================== */}
      <QuickActions />
    </div>
  );
}
