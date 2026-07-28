import React from 'react';
import { 
  CheckCircle2, 
  Circle, 
  Clock, 
  Trash2, 
  Edit3, 
  CheckSquare, 
  Square, 
  Tag, 
  User as UserIcon,
  AlertCircle
} from 'lucide-react';
import { Task, TaskPriority, TaskCategory } from '../types';

interface TaskCardProps {
  task: Task;
  onToggleStatus: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string, title: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
}

const priorityStyles: Record<TaskPriority, { bg: string; text: string; label: string }> = {
  high: { bg: 'bg-rose-500/10 border-rose-500/20', text: 'text-rose-400', label: 'High Priority' },
  medium: { bg: 'bg-amber-500/10 border-amber-500/20', text: 'text-amber-400', label: 'Medium Priority' },
  low: { bg: 'bg-slate-500/10 border-slate-500/20', text: 'text-slate-400', label: 'Low Priority' },
};

const categoryBadgeStyles: Record<TaskCategory, string> = {
  work: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  personal: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
  urgent: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  feature: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  general: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onToggleStatus,
  onEdit,
  onDelete,
  onToggleSubtask,
}) => {
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';

  const completedSubtasksCount = task.subtasks?.filter(s => s.completed).length || 0;
  const totalSubtasksCount = task.subtasks?.length || 0;
  const progressPercent = totalSubtasksCount > 0 ? Math.round((completedSubtasksCount / totalSubtasksCount) * 100) : 0;

  return (
    <div className={`group relative rounded-xl border p-4 transition-all duration-200 bg-slate-900/60 hover:bg-slate-900 hover:shadow-xl ${
      isCompleted 
        ? 'border-slate-800/80 bg-slate-950/40 opacity-75' 
        : isInProgress 
        ? 'border-indigo-500/40 shadow-indigo-500/5' 
        : 'border-slate-800 hover:border-slate-700'
    }`}>
      
      {/* Top row: Status toggle + Title + Action buttons */}
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggleStatus(task)}
          className="mt-0.5 text-slate-500 hover:text-indigo-400 transition-colors flex-shrink-0"
          title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
        >
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 fill-emerald-500/20" />
          ) : isInProgress ? (
            <Clock className="w-5 h-5 text-indigo-400 animate-pulse" />
          ) : (
            <Circle className="w-5 h-5 text-slate-500 hover:text-indigo-400" />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className={`font-semibold text-sm leading-snug break-words ${
              isCompleted ? 'line-through text-slate-400' : 'text-slate-100'
            }`}>
              {task.title}
            </h3>

            {/* Category tag */}
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border uppercase tracking-wider ${
              categoryBadgeStyles[task.category] || categoryBadgeStyles.general
            }`}>
              <Tag className="w-2.5 h-2.5" />
              {task.category}
            </span>

            {/* Priority tag */}
            <span className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-md border ${
              priorityStyles[task.priority].bg
            } ${priorityStyles[task.priority].text}`}>
              <AlertCircle className="w-2.5 h-2.5" />
              {task.priority}
            </span>
          </div>

          {/* Task description */}
          {task.description && (
            <p className="text-xs text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
              {task.description}
            </p>
          )}

          {/* Subtasks checklist if present */}
          {totalSubtasksCount > 0 && (
            <div className="mt-3 pt-2.5 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1.5">
                <span className="font-medium text-slate-300">Subtasks ({completedSubtasksCount}/{totalSubtasksCount})</span>
                <span className="font-mono">{progressPercent}%</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden mb-2">
                <div 
                  className="bg-indigo-500 h-full rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              <div className="space-y-1">
                {task.subtasks?.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => onToggleSubtask(task.id, sub.id)}
                    className="flex items-center gap-2 w-full text-left text-xs py-1 px-1.5 rounded hover:bg-slate-800/60 transition-colors text-slate-300 group/sub"
                  >
                    {sub.completed ? (
                      <CheckSquare className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                    ) : (
                      <Square className="w-3.5 h-3.5 text-slate-500 group-hover/sub:text-slate-300 flex-shrink-0" />
                    )}
                    <span className={`truncate ${sub.completed ? 'line-through text-slate-500' : ''}`}>
                      {sub.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Card footer details */}
          <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800/50 gap-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 text-slate-400">
                <UserIcon className="w-3 h-3 text-slate-400" />
                {task.assignedTo || task.createdByName || 'Unassigned'}
              </span>
              <span className="text-slate-400">
                {new Date(task.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            {/* Quick Card Edit/Delete actions */}
            <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onEdit(task)}
                className="p-1 rounded text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
                title="Edit Task"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(task.id, task.title)}
                className="p-1 rounded text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                title="Delete Task"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
