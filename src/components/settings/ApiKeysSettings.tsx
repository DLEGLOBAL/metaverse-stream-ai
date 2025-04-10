
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Key, Copy, Eye, EyeOff, Plus, Shield, Clock, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ApiKeysSettings: React.FC = () => {
  const [apiKeys, setApiKeys] = useState([
    { 
      id: 1, 
      name: 'Production API Key',
      key: 'sk_prod_2dB8Hj5fKl9mN3pQr7sT',
      type: 'production',
      isVisible: false,
      createdAt: '2023-08-15',
      lastUsed: '2023-09-28',
      permissions: ['read', 'write', 'delete']
    },
    { 
      id: 2, 
      name: 'Development API Key',
      key: 'sk_dev_6gF3Kl8dH2jL4mN7pR9s',
      type: 'development',
      isVisible: false,
      createdAt: '2023-10-03',
      lastUsed: '2023-10-05',
      permissions: ['read', 'write']
    },
    { 
      id: 3, 
      name: 'Testing API Key',
      key: 'sk_test_9pR7sT5vU3wX1yZ2aB4c',
      type: 'test',
      isVisible: false,
      createdAt: '2023-11-20',
      lastUsed: 'Never',
      permissions: ['read']
    }
  ]);
  
  const [newApiKey, setNewApiKey] = useState({
    name: '',
    type: 'development',
    permissions: ['read']
  });
  
  const [isCreatingKey, setIsCreatingKey] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  const toggleKeyVisibility = (id: number) => {
    setApiKeys(keys => 
      keys.map(key => 
        key.id === id ? { ...key, isVisible: !key.isVisible } : key
      )
    );
  };
  
  const copyToClipboard = (text: string, name: string) => {
    navigator.clipboard.writeText(text);
    
    toast({
      title: 'API Key Copied',
      description: `${name} has been copied to clipboard`,
    });
  };
  
  const createNewKey = () => {
    if (!newApiKey.name.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a name for the API key',
        variant: 'destructive'
      });
      return;
    }
    
    setIsCreatingKey(true);
    
    // Simulate API key creation
    setTimeout(() => {
      const generatedKey = `sk_${newApiKey.type.substring(0, 4)}_${generateRandomString(20)}`;
      
      const createdKey = {
        id: Date.now(),
        name: newApiKey.name,
        key: generatedKey,
        type: newApiKey.type,
        isVisible: true,
        createdAt: new Date().toISOString().split('T')[0],
        lastUsed: 'Never',
        permissions: newApiKey.permissions
      };
      
      setApiKeys([...apiKeys, createdKey]);
      setNewApiKey({
        name: '',
        type: 'development',
        permissions: ['read']
      });
      setIsCreatingKey(false);
      setShowCreateForm(false);
      
      toast({
        title: 'API Key Created',
        description: `${createdKey.name} has been created successfully`,
      });
    }, 1500);
  };
  
  const deleteApiKey = (id: number, name: string) => {
    setApiKeys(apiKeys.filter(key => key.id !== id));
    
    toast({
      title: 'API Key Deleted',
      description: `${name} has been deleted`,
    });
  };
  
  const togglePermission = (permission: string) => {
    if (newApiKey.permissions.includes(permission)) {
      setNewApiKey({
        ...newApiKey,
        permissions: newApiKey.permissions.filter(p => p !== permission)
      });
    } else {
      setNewApiKey({
        ...newApiKey,
        permissions: [...newApiKey.permissions, permission]
      });
    }
  };
  
  const regenerateApiKey = (id: number, name: string) => {
    const key = apiKeys.find(k => k.id === id);
    if (!key) return;
    
    const generatedKey = `sk_${key.type.substring(0, 4)}_${generateRandomString(20)}`;
    
    setApiKeys(keys => 
      keys.map(key => 
        key.id === id ? { 
          ...key, 
          key: generatedKey,
          isVisible: true,
          createdAt: new Date().toISOString().split('T')[0],
          lastUsed: 'Never'
        } : key
      )
    );
    
    toast({
      title: 'API Key Regenerated',
      description: `${name} has been regenerated successfully`,
    });
  };
  
  const generateRandomString = (length: number) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };
  
  return (
    <div className="space-y-6">
      <Card className="glass-card">
        <CardHeader className="pb-2 flex flex-row items-center justify-between">
          <CardTitle className="text-white">API Keys</CardTitle>
          <Button 
            className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
            onClick={() => setShowCreateForm(!showCreateForm)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Create New Key
          </Button>
        </CardHeader>
        <CardContent>
          {showCreateForm && (
            <Card className="bg-meta-dark-blue/50 mb-6 border border-meta-teal/30">
              <CardHeader className="pb-2">
                <CardTitle className="text-white text-lg">Create New API Key</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Key Name</label>
                    <Input
                      value={newApiKey.name}
                      onChange={(e) => setNewApiKey({...newApiKey, name: e.target.value})}
                      placeholder="Enter a name for this key"
                      className="bg-meta-dark-blue border border-meta-teal/30"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Key Type</label>
                    <Select
                      value={newApiKey.type}
                      onValueChange={(value) => setNewApiKey({...newApiKey, type: value})}
                    >
                      <SelectTrigger className="w-full bg-meta-dark-blue border border-meta-teal/30 text-white">
                        <SelectValue placeholder="Select key type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="development">Development</SelectItem>
                        <SelectItem value="test">Test</SelectItem>
                        <SelectItem value="production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Permissions</label>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <Switch 
                          checked={newApiKey.permissions.includes('read')}
                          onCheckedChange={() => togglePermission('read')}
                          id="read-permission"
                        />
                        <label htmlFor="read-permission" className="ml-2 cursor-pointer text-sm">
                          Read (View resources)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Switch 
                          checked={newApiKey.permissions.includes('write')}
                          onCheckedChange={() => togglePermission('write')}
                          id="write-permission"
                        />
                        <label htmlFor="write-permission" className="ml-2 cursor-pointer text-sm">
                          Write (Create and update resources)
                        </label>
                      </div>
                      <div className="flex items-center">
                        <Switch 
                          checked={newApiKey.permissions.includes('delete')}
                          onCheckedChange={() => togglePermission('delete')}
                          id="delete-permission"
                        />
                        <label htmlFor="delete-permission" className="ml-2 cursor-pointer text-sm">
                          Delete (Remove resources)
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowCreateForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-button-gradient text-meta-dark-blue hover:brightness-110"
                      onClick={createNewKey}
                      disabled={isCreatingKey || !newApiKey.name.trim()}
                    >
                      {isCreatingKey ? 'Creating...' : 'Create API Key'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          <div className="space-y-4">
            {apiKeys.length > 0 ? (
              apiKeys.map(apiKey => (
                <div 
                  key={apiKey.id}
                  className="p-4 border border-gray-700 rounded-md bg-meta-dark-blue/30"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-medium text-white flex items-center">
                        <Key className="h-4 w-4 mr-2 text-meta-teal" />
                        {apiKey.name}
                      </h3>
                      <div className="space-x-2 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded ${
                          apiKey.type === 'production' ? 'bg-red-900/30 text-red-400' :
                          apiKey.type === 'development' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-blue-900/30 text-blue-400'
                        }`}>
                          {apiKey.type.charAt(0).toUpperCase() + apiKey.type.slice(1)}
                        </span>
                        
                        {apiKey.permissions.includes('read') && (
                          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                            Read
                          </span>
                        )}
                        
                        {apiKey.permissions.includes('write') && (
                          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                            Write
                          </span>
                        )}
                        
                        {apiKey.permissions.includes('delete') && (
                          <span className="text-xs bg-gray-700 text-gray-300 px-2 py-0.5 rounded">
                            Delete
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex space-x-1">
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => toggleKeyVisibility(apiKey.id)}
                      >
                        {apiKey.isVisible ? 
                          <EyeOff className="h-4 w-4" /> : 
                          <Eye className="h-4 w-4" />
                        }
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0"
                        onClick={() => copyToClipboard(apiKey.key, apiKey.name)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-900/20"
                        onClick={() => deleteApiKey(apiKey.id, apiKey.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="relative flex-1">
                      <Input
                        type={apiKey.isVisible ? "text" : "password"} 
                        value={apiKey.key}
                        readOnly
                        className="pr-16 font-mono text-sm bg-meta-dark-blue border border-meta-teal/20"
                      />
                      <Button 
                        size="sm"
                        variant="ghost"
                        className="absolute right-0 top-0 h-full px-3 text-xs font-normal text-meta-teal hover:text-white hover:bg-meta-teal/10"
                        onClick={() => regenerateApiKey(apiKey.id, apiKey.name)}
                      >
                        <RefreshCw className="h-3 w-3 mr-1" />
                        Rotate
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex text-xs text-gray-400 space-x-4">
                    <div className="flex items-center">
                      <Shield className="h-3 w-3 mr-1" />
                      <span>Created: {apiKey.createdAt}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Last used: {apiKey.lastUsed}</span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-400">
                <Key className="h-12 w-12 mx-auto mb-3 opacity-30" />
                <p>No API keys created yet</p>
                <p className="text-sm mt-1">Create your first API key to integrate with external services</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">API Access Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Rate Limiting</h3>
                <p className="text-xs text-gray-400">Limit the number of API requests per minute</p>
              </div>
              <Switch 
                checked={true}
                onCheckedChange={() => {
                  toast({
                    title: 'Security Warning',
                    description: 'Disabling rate limiting can lead to API abuse. Not recommended.',
                    variant: 'destructive'
                  });
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">IP Restrictions</h3>
                <p className="text-xs text-gray-400">Only allow API access from specific IP addresses</p>
              </div>
              <Switch 
                checked={false}
                onCheckedChange={() => {
                  toast({
                    title: 'IP Restrictions',
                    description: 'IP restriction settings have been updated.',
                  });
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">Key Expiration</h3>
                <p className="text-xs text-gray-400">Automatically expire keys after a period of inactivity</p>
              </div>
              <Switch 
                checked={true}
                onCheckedChange={() => {
                  toast({
                    title: 'Key Expiration',
                    description: 'Key expiration settings have been updated.',
                  });
                }}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h3 className="text-base font-medium">API Usage Logs</h3>
                <p className="text-xs text-gray-400">Keep detailed logs of all API calls</p>
              </div>
              <Switch 
                checked={true}
                onCheckedChange={() => {
                  toast({
                    title: 'API Logging',
                    description: 'API usage logging settings have been updated.',
                  });
                }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle className="text-white">Rate Limits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-700 rounded-md bg-meta-dark-blue/30">
                <h3 className="font-medium text-white mb-1">Development</h3>
                <div className="text-2xl font-bold text-meta-teal mb-2">100</div>
                <p className="text-xs text-gray-400">requests per minute</p>
              </div>
              
              <div className="p-4 border border-gray-700 rounded-md bg-meta-dark-blue/30">
                <h3 className="font-medium text-white mb-1">Test</h3>
                <div className="text-2xl font-bold text-yellow-400 mb-2">500</div>
                <p className="text-xs text-gray-400">requests per minute</p>
              </div>
              
              <div className="p-4 border border-gray-700 rounded-md bg-meta-dark-blue/30">
                <h3 className="font-medium text-white mb-1">Production</h3>
                <div className="text-2xl font-bold text-red-400 mb-2">1,000</div>
                <p className="text-xs text-gray-400">requests per minute</p>
              </div>
            </div>
            
            <div className="mt-4">
              <Button 
                variant="outline"
                onClick={() => {
                  toast({
                    title: 'Rate Limit Settings',
                    description: 'Advanced rate limit configuration will be available in the next update.',
                  });
                }}
              >
                Configure Custom Rate Limits
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApiKeysSettings;
