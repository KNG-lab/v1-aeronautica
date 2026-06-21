import type { LucideProps } from 'lucide-react'
import {
  // course icons
  Users, RefreshCw, Plane, GraduationCap,
  // benefit icons
  Award, UserCheck, Dumbbell, MapPin, Cpu, HeartHandshake,
  // dashboard nav icons
  LayoutDashboard, ClipboardList, CreditCard, CalendarDays, FolderOpen,
  Megaphone, BadgeCheck, User, BookOpen, Building2, UserCog, BarChart3,
  // fallback
  Circle,
} from 'lucide-react'

/**
 * Explicit icon registry. We import only the icons referenced by string name
 * in mock data / nav configs — importing lucide's full `icons` barrel would
 * bundle ~1500 icons. Add new names here when data references them.
 */
const REGISTRY: Record<string, React.ComponentType<LucideProps>> = {
  Users, RefreshCw, Plane, GraduationCap,
  Award, UserCheck, Dumbbell, MapPin, Cpu, HeartHandshake,
  LayoutDashboard, ClipboardList, CreditCard, CalendarDays, FolderOpen,
  Megaphone, BadgeCheck, User, BookOpen, Building2, UserCog, BarChart3,
}

interface IconProps extends LucideProps {
  name: string
}

/** Resolve a registered Lucide icon by its string name; falls back to Circle. */
export default function Icon({ name, ...props }: IconProps) {
  const Cmp = REGISTRY[name] ?? Circle
  return <Cmp {...props} />
}
