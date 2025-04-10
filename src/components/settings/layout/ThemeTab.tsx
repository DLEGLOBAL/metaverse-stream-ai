
import React, { useState } from 'react';
import { ThemeToggle } from '@/contexts/theme';
import { toast } from "@/hooks/use-toast";
import { useCustomTheme } from '@/contexts/theme/CustomThemeContext';
import { CustomTheme } from '@/contexts/theme/customTheme.types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { 
  Palette, 
  Save, 
  Plus, 
  Edit, 
  Trash2, 
  RotateCcw, 
  Check,
  ChevronDown 
} from 'lucide-react';
import { useForm } from 'react-hook-form';

const ThemeTab = () => {
  const { 
    customThemes, 
    activeCustomThemeId, 
    addCustomTheme, 
    updateCustomTheme,
    deleteCustomTheme, 
    applyCustomTheme, 
    resetToDefaultTheme 
  } = useCustomTheme();
  
  const [isCreatingTheme, setIsCreatingTheme] = useState(false);
  const [editingThemeId, setEditingThemeId] = useState<string | null>(null);
  
  const defaultValues = {
    name: '',
    description: '',
    isDark: true,
    background: '#1a2b4b',
    foreground: '#f8fafc',
    primary: '#0CFFE1',
    secondary: '#2d3748',
    accent: '#0CFFE1',
    muted: '#4a5568',
    border: '#2d3748',
  };
  
  const form = useForm({ defaultValues });
  const editForm = useForm({ defaultValues });
  
  const activeTheme = activeCustomThemeId 
    ? customThemes.find(theme => theme.id === activeCustomThemeId) 
    : null;
  
  const handleCreateTheme = (data: typeof defaultValues) => {
    const { name, description, isDark, ...colors } = data;
    
    addCustomTheme({
      name,
      description,
      isDark,
      colors: {
        background: colors.background,
        foreground: colors.foreground,
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        muted: colors.muted,
        border: colors.border,
      }
    });
    
    setIsCreatingTheme(false);
    form.reset(defaultValues);
  };
  
  const handleEditTheme = (data: typeof defaultValues) => {
    if (!editingThemeId) return;
    
    const { name, description, isDark, ...colors } = data;
    
    updateCustomTheme(editingThemeId, {
      name,
      description,
      isDark,
      colors: {
        background: colors.background,
        foreground: colors.foreground,
        primary: colors.primary,
        secondary: colors.secondary,
        accent: colors.accent,
        muted: colors.muted,
        border: colors.border,
      }
    });
    
    setEditingThemeId(null);
    editForm.reset(defaultValues);
  };
  
  const startEditingTheme = (theme: CustomTheme) => {
    const { colors } = theme;
    
    editForm.reset({
      name: theme.name,
      description: theme.description || '',
      isDark: theme.isDark,
      background: colors.background,
      foreground: colors.foreground,
      primary: colors.primary,
      secondary: colors.secondary,
      accent: colors.accent,
      muted: colors.muted,
      border: colors.border,
    });
    
    setEditingThemeId(theme.id);
  };
  
  const ColorPicker = ({ 
    name, 
    label, 
    form, 
    defaultValue 
  }: { 
    name: string; 
    label: string; 
    form: any; 
    defaultValue: string; 
  }) => (
    <FormField
      control={form.control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <FormItem className="mb-3">
          <div className="flex items-center justify-between">
            <FormLabel className="text-sm font-medium text-gray-300">
              {label}
            </FormLabel>
            <div className="flex items-center space-x-2">
              <div 
                className="w-5 h-5 rounded-full border border-gray-600" 
                style={{ backgroundColor: field.value }}
              />
              <FormControl>
                <Input 
                  type="color" 
                  className="w-16 h-8 p-0 border-none bg-transparent" 
                  {...field} 
                />
              </FormControl>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
  
  return (
    <div className="space-y-6">
      {/* Theme toggle */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h3 className="text-lg font-medium">Color Theme</h3>
          <p className="text-sm text-gray-400">
            Switch between light and dark themes for comfortable viewing
          </p>
        </div>
        <ThemeToggle showLabels size="md" />
      </div>
      
      {/* Custom themes section */}
      <div className="space-y-4 pt-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Custom Themes</h3>
          
          <div className="flex space-x-2">
            <Dialog open={isCreatingTheme} onOpenChange={setIsCreatingTheme}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  New Theme
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-meta-dark-blue text-white border border-meta-teal/30">
                <DialogHeader>
                  <DialogTitle>Create Custom Theme</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Create your own custom color theme
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(handleCreateTheme)} className="space-y-4">
                    {/* Theme name and description */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme Name</FormLabel>
                          <FormControl>
                            <Input placeholder="My Custom Theme" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="A brief description of your theme" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isDark"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>Dark Mode</FormLabel>
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="toggle"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-sm font-medium mb-3">Color Palette</h4>
                      
                      <div className="space-y-2">
                        <ColorPicker name="background" label="Background" form={form} defaultValue="#1a2b4b" />
                        <ColorPicker name="foreground" label="Foreground" form={form} defaultValue="#f8fafc" />
                        <ColorPicker name="primary" label="Primary" form={form} defaultValue="#0CFFE1" />
                        <ColorPicker name="secondary" label="Secondary" form={form} defaultValue="#2d3748" />
                        <ColorPicker name="accent" label="Accent" form={form} defaultValue="#0CFFE1" />
                        <ColorPicker name="muted" label="Muted" form={form} defaultValue="#4a5568" />
                        <ColorPicker name="border" label="Border" form={form} defaultValue="#2d3748" />
                      </div>
                    </div>
                    
                    <DialogFooter className="mt-4">
                      <Button 
                        type="submit" 
                        className="bg-meta-teal text-meta-dark-blue hover:bg-meta-teal/90"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Theme
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            {/* Edit theme dialog */}
            <Dialog open={!!editingThemeId} onOpenChange={(open) => !open && setEditingThemeId(null)}>
              <DialogContent className="sm:max-w-[425px] bg-meta-dark-blue text-white border border-meta-teal/30">
                <DialogHeader>
                  <DialogTitle>Edit Custom Theme</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Modify your custom theme
                  </DialogDescription>
                </DialogHeader>
                
                <Form {...editForm}>
                  <form onSubmit={editForm.handleSubmit(handleEditTheme)} className="space-y-4">
                    {/* Theme name and description */}
                    <FormField
                      control={editForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Theme Name</FormLabel>
                          <FormControl>
                            <Input placeholder="My Custom Theme" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (Optional)</FormLabel>
                          <FormControl>
                            <Input placeholder="A brief description of your theme" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={editForm.control}
                      name="isDark"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>Dark Mode</FormLabel>
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className="toggle"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="border-t border-gray-700 pt-4">
                      <h4 className="text-sm font-medium mb-3">Color Palette</h4>
                      
                      <div className="space-y-2">
                        <ColorPicker name="background" label="Background" form={editForm} defaultValue="#1a2b4b" />
                        <ColorPicker name="foreground" label="Foreground" form={editForm} defaultValue="#f8fafc" />
                        <ColorPicker name="primary" label="Primary" form={editForm} defaultValue="#0CFFE1" />
                        <ColorPicker name="secondary" label="Secondary" form={editForm} defaultValue="#2d3748" />
                        <ColorPicker name="accent" label="Accent" form={editForm} defaultValue="#0CFFE1" />
                        <ColorPicker name="muted" label="Muted" form={editForm} defaultValue="#4a5568" />
                        <ColorPicker name="border" label="Border" form={editForm} defaultValue="#2d3748" />
                      </div>
                    </div>
                    
                    <DialogFooter className="mt-4">
                      <Button 
                        type="submit" 
                        className="bg-meta-teal text-meta-dark-blue hover:bg-meta-teal/90"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            
            {/* Theme selector dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Palette className="h-4 w-4 mr-2" />
                  {activeTheme ? activeTheme.name : "Default Theme"}
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="min-w-[200px] bg-meta-dark-blue text-white border border-meta-teal/30">
                <DropdownMenuLabel>Select Theme</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-700" />
                
                <DropdownMenuItem 
                  onClick={resetToDefaultTheme}
                  className="flex items-center justify-between"
                >
                  <span>Default Theme</span>
                  {!activeCustomThemeId && <Check className="h-4 w-4" />}
                </DropdownMenuItem>
                
                {customThemes.length > 0 && (
                  <>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuLabel>Custom Themes</DropdownMenuLabel>
                    
                    {customThemes.map(theme => (
                      <DropdownMenuItem
                        key={theme.id}
                        className="flex items-center justify-between group"
                      >
                        <div 
                          className="flex-1 cursor-pointer" 
                          onClick={() => applyCustomTheme(theme.id)}
                        >
                          <span className="flex items-center">
                            <div 
                              className="w-3 h-3 rounded-full mr-2" 
                              style={{ backgroundColor: theme.colors.primary }}
                            />
                            {theme.name}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              startEditingTheme(theme);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-400"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteCustomTheme(theme.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        {activeCustomThemeId === theme.id && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
                
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem 
                  onClick={() => setIsCreatingTheme(true)}
                  className="flex items-center text-meta-teal"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Theme
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {activeCustomThemeId && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={resetToDefaultTheme}
                className="flex items-center"
                title="Reset to default theme"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
        
        {/* Theme preview */}
        {activeTheme && (
          <div className="mt-4 p-4 rounded-md border border-gray-700 bg-meta-dark-blue/50">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">{activeTheme.name}</h4>
              <div className="text-xs text-gray-400">{activeTheme.isDark ? "Dark Theme" : "Light Theme"}</div>
            </div>
            
            {activeTheme.description && (
              <p className="text-xs text-gray-400 mb-3">{activeTheme.description}</p>
            )}
            
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(activeTheme.colors).map(([key, color]) => (
                <div key={key} className="flex flex-col items-center">
                  <div 
                    className="w-10 h-10 rounded-md border border-gray-700 mb-1" 
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-xs text-gray-400">{key}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Color quick selection (still available) */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">
              Accent Color
            </label>
            <div className="flex space-x-2">
              {['#0CFFE1', '#9b87f5', '#f87171', '#4ade80', '#f59e0b'].map(color => (
                <button
                  key={color}
                  onClick={() => {
                    if (activeCustomThemeId) {
                      const activeTheme = customThemes.find(t => t.id === activeCustomThemeId);
                      if (activeTheme) {
                        updateCustomTheme(activeCustomThemeId, {
                          colors: {
                            ...activeTheme.colors,
                            primary: color,
                            accent: color
                          }
                        });
                      }
                    } else {
                      toast({
                        title: "Select a Custom Theme",
                        description: "Please create or select a custom theme first to change its accent color."
                      });
                    }
                  }}
                  className="w-6 h-6 rounded-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-300 mb-1 block">
              Sidebar Style
            </label>
            <select className="w-full bg-meta-dark-blue border border-meta-teal/30 rounded-md py-2 px-3 text-white">
              <option>Solid</option>
              <option>Transparent</option>
              <option>Glassmorphism</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeTab;
