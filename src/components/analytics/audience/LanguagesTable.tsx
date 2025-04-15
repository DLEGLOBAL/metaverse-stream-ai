
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

interface LanguagesTableProps {
  topLanguages: {
    name: string;
    percentage: number;
    viewers: number;
    growth: number;
  }[];
}

const LanguagesTable = ({ topLanguages }: LanguagesTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Languages</CardTitle>
        <CardDescription>Languages spoken by your audience</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[400px] touch-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Language</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Total Viewers</TableHead>
                <TableHead>Growth (30 days)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topLanguages.map((language, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{language.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mr-2">
                        <div 
                          className="bg-meta-teal h-2.5 rounded-full" 
                          style={{ width: `${language.percentage}%` }}
                        ></div>
                      </div>
                      {language.percentage}%
                    </div>
                  </TableCell>
                  <TableCell>{language.viewers.toLocaleString()}</TableCell>
                  <TableCell className={language.growth > 0 ? 'text-green-500' : 'text-red-500'}>
                    {language.growth > 0 ? '+' : ''}{language.growth}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default LanguagesTable;
