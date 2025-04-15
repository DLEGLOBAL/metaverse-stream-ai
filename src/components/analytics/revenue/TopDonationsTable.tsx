
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TopDonationsProps {
  topDonations: {
    username: string;
    platform: string;
    date: string;
    amount: number;
  }[];
}

const TopDonationsTable = ({ topDonations }: TopDonationsProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Supporters</CardTitle>
        <CardDescription>Highest donations in the period</CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="max-h-[320px] touch-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Platform</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topDonations.map((donation, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{donation.username}</TableCell>
                  <TableCell>{donation.platform}</TableCell>
                  <TableCell>{donation.date}</TableCell>
                  <TableCell className="text-right font-mono text-green-500">
                    ${donation.amount.toFixed(2)}
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

export default TopDonationsTable;
