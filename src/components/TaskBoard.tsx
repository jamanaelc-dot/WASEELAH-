import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ListFilter, 
  RefreshCw,
  FolderPlus,
  AlertCircle,
  Tag
} from 'lucide-react';
import { Task, TaskCategory, TaskPriority, TaskStatus } from '../types';
import { TaskCard } from './TaskCard';

interface TaskBoardProps {
  tasks: Task[];
  isLoading: boolean;
  onToggleStatus: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string, title: string) => void;
  onToggleSubtask: (taskId: string, subtaskId: string) => void;
  onOpenCreateModal: () => void;
  onSeedSampleData: () => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
  tasks,
  isLoading,
  onToggleStatus,
  onEditTask,
  onDeleteTask,
  onToggleSubtask,
  onOpenCreateModal,
  onSeedSampleData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | TaskStatus>('all');
  const [selectedCategory, setSelectedCategory] = useState<'all' | TaskCategory>('all');
  const [selectedPriority, setSelectedPriority] = useState<'all' | TaskPriority>('all');

  // Filter tasks
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (task.category && task.category.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    const matchesCategory = selectedCategory === 'all' || task.category === selectedCategory;
    const matchesPriority = selectedPriority === 'all' || task.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const highPriorityTasks = tasks.filter((t) => t.priority === 'high' && t.status !== 'completed').length;
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">Total Cloud Items</div>
            <div className="text-xl font-bold text-white mt-1">{totalTasks}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400">
            <ListFilter className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">Completion Rate</div>
            <div className="text-xl font-bold text-emerald-400 mt-1">{completionRate}%</div>
          </div>
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">In Progress</div>
            <div className="text-xl font-bold text-cyan-400 mt-1">{inProgressTasks}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400">
            <Clock className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
          <div>
            <div className="text-xs font-semibold text-slate-400">High Priority</div>
            <div className="text-xl font-bold text-rose-400 mt-1">{highPriorityTasks}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-rose-500/10 text-rose-400">
            <AlertCircle className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Action Bar: Search, Filters, New Task */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 space-y-4">
        
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search synced tasks, categories, tags..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={onSeedSampleData}
              className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors border border-slate-700/50"
              title="Populate sample tasks for testing live multi-device synchronization"
            >
              <FolderPlus className="w-4 h-4 text-indigo-400" />
              <span className="hidden sm:inline">Seed Demo Sync Data</span>
              <span className="sm:hidden">Seed Data</span>
            </button>

            <button
              onClick={onOpenCreateModal}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4" />
              <span>New Cloud Record</span>
            </button>
          </div>

        </div>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800/80 text-xs">
          
          {/* Status Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {(['all', 'todo', 'in_progress', 'completed'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1.5 rounded-lg font-semibold capitalize transition-colors whitespace-nowrap ${
                  selectedStatus === st
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {st === 'all' ? 'All Items' : st.replace('_', ' ')}
              </button>
            ))}
          </div>

          {/* Category & Priority Selectors */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-slate-400">
              <Tag className="w-3.5 h-3.5 text-blue-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="work">Work</option>
                <option value="personal">Personal</option>
                <option value="feature">Feature</option>
                <option value="urgent">Urgent</option>
                <option value="general">General</option>
              </select>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <Filter className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={selectedPriority}
                onChange={(e) => setSelectedPriority(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none"
              >
                <option value="all">All Priorities</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

        </div>

      </div>

      {/* Task List / Grid */}
      {isLoading ? (
        <div className="text-center py-16 space-y-3">
          <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin mx-auto" />
          <p className="text-xs text-slate-400 font-mono">Connecting to Cloud Firestore Realtime DB...</p>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-12 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">No tasks found</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
              {searchQuery || selectedCategory !== 'all' || selectedPriority !== 'all' || selectedStatus !== 'all'
                ? 'Try resetting your search filters or create a new real-time cloud record.'
                : 'Click "New Cloud Record" or "Seed Demo Sync Data" to populate your real-time database.'}
            </p>
          </div>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={onSeedSampleData}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
            >
              Seed Demo Sync Data
            </button>
            <button
              onClick={onOpenCreateModal}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-colors"
            >
              Create Task
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleStatus={onToggleStatus}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onToggleSubtask={onToggleSubtask}
            />
          ))}
        </div>
      )}

    </div>
  );
};
