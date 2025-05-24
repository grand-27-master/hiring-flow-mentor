
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface HiringStats {
  totalHires: number;
  avgDaysToHire: number;
  avgCostPerHire: number;
  retentionRate: number;
  activeCandidates: number;
  activeOpenings: number;
  pipelineStages: {
    name: string;
    candidates: number;
    status: string;
    color: string;
    percentage: number;
  }[];
  monthlyData: {
    month: string;
    hires: number;
    budget: number;
  }[];
}

interface HiringStatsContextType {
  stats: HiringStats;
  updateStats: (updates: Partial<HiringStats>) => void;
  incrementHires: () => void;
  addCandidateToStage: (stageName: string) => void;
  moveCandidateBetweenStages: (fromStage: string, toStage: string) => void;
}

const initialStats: HiringStats = {
  totalHires: 0,
  avgDaysToHire: 0,
  avgCostPerHire: 0,
  retentionRate: 85,
  activeCandidates: 0,
  activeOpenings: 0,
  pipelineStages: [
    {
      name: "Application Review",
      candidates: 0,
      status: "active",
      color: "bg-blue-500",
      percentage: 0
    },
    {
      name: "Phone Screening",
      candidates: 0,
      status: "pending",
      color: "bg-purple-500",
      percentage: 0
    },
    {
      name: "Technical Interview",
      candidates: 0,
      status: "pending",
      color: "bg-indigo-500",
      percentage: 0
    },
    {
      name: "Final Interview",
      candidates: 0,
      status: "pending",
      color: "bg-orange-500",
      percentage: 0
    },
    {
      name: "Offer Stage",
      candidates: 0,
      status: "pending",
      color: "bg-green-500",
      percentage: 0
    }
  ],
  monthlyData: [
    { month: "Jan", hires: 0, budget: 0 },
    { month: "Feb", hires: 0, budget: 0 },
    { month: "Mar", hires: 0, budget: 0 },
    { month: "Apr", hires: 0, budget: 0 },
    { month: "May", hires: 0, budget: 0 },
    { month: "Jun", hires: 0, budget: 0 },
  ]
};

const HiringStatsContext = createContext<HiringStatsContextType | undefined>(undefined);

export const HiringStatsProvider = ({ children }: { children: ReactNode }) => {
  const [stats, setStats] = useState<HiringStats>(initialStats);

  const updateStats = (updates: Partial<HiringStats>) => {
    setStats(prev => ({ ...prev, ...updates }));
  };

  const incrementHires = () => {
    setStats(prev => ({
      ...prev,
      totalHires: prev.totalHires + 1,
      monthlyData: prev.monthlyData.map((month, index) => 
        index === prev.monthlyData.length - 1 
          ? { ...month, hires: month.hires + 1 }
          : month
      )
    }));
  };

  const addCandidateToStage = (stageName: string) => {
    setStats(prev => {
      const updatedStages = prev.pipelineStages.map(stage => 
        stage.name === stageName 
          ? { ...stage, candidates: stage.candidates + 1, status: "active" }
          : stage
      );
      
      const totalCandidates = updatedStages.reduce((sum, stage) => sum + stage.candidates, 0);
      const updatedStagesWithPercentage = updatedStages.map(stage => ({
        ...stage,
        percentage: totalCandidates > 0 ? Math.round((stage.candidates / totalCandidates) * 100) : 0
      }));

      return {
        ...prev,
        pipelineStages: updatedStagesWithPercentage,
        activeCandidates: totalCandidates
      };
    });
  };

  const moveCandidateBetweenStages = (fromStage: string, toStage: string) => {
    setStats(prev => {
      const updatedStages = prev.pipelineStages.map(stage => {
        if (stage.name === fromStage && stage.candidates > 0) {
          return { ...stage, candidates: stage.candidates - 1 };
        }
        if (stage.name === toStage) {
          return { ...stage, candidates: stage.candidates + 1, status: "active" };
        }
        return stage;
      });

      const totalCandidates = updatedStages.reduce((sum, stage) => sum + stage.candidates, 0);
      const updatedStagesWithPercentage = updatedStages.map(stage => ({
        ...stage,
        percentage: totalCandidates > 0 ? Math.round((stage.candidates / totalCandidates) * 100) : 0
      }));

      return {
        ...prev,
        pipelineStages: updatedStagesWithPercentage,
        activeCandidates: totalCandidates
      };
    });
  };

  return (
    <HiringStatsContext.Provider value={{
      stats,
      updateStats,
      incrementHires,
      addCandidateToStage,
      moveCandidateBetweenStages
    }}>
      {children}
    </HiringStatsContext.Provider>
  );
};

export const useHiringStats = () => {
  const context = useContext(HiringStatsContext);
  if (context === undefined) {
    throw new Error('useHiringStats must be used within a HiringStatsProvider');
  }
  return context;
};
