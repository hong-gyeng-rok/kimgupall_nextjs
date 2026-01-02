"use client";

import React, { useState } from 'react';

// Mock Data Type
interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
}

// Mock Data
const mockPosts: Post[] = [
  { id: 1, title: '게시판 오픈합니다.', author: '관리자', date: '2026-01-01', views: 100 },
  { id: 2, title: '안녕하세요 가입인사 드립니다.', author: '홍길동', date: '2026-01-02', views: 5 },
  { id: 3, title: '작업 문의 드립니다.', author: '김철수', date: '2026-01-02', views: 12 },
  { id: 4, title: '갤러리 사진이 너무 멋지네요', author: '이영희', date: '2026-01-03', views: 8 },
  { id: 5, title: '다음 전시 일정은 언제인가요?', author: '박민수', date: '2026-01-03', views: 25 },
  { id: 6, title: '콜라보레이션 제안', author: 'DesignAgency', date: '2026-01-04', views: 32 },
];

export default function BoldBoard() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8 text-black bg-white min-h-[50vh]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-6 gap-4 border-b-2 border-black pb-4">
        <div className="w-full md:w-auto text-center md:text-left">
            <h1 className="text-3xl md:text-4xl font-bold font-chosunGoosu mb-2">BOARD</h1>
            <p className="text-gray-500 text-sm md:text-base font-sans">자유롭게 의견을 나누는 공간입니다.</p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto font-sans">
            <input 
                type="text" 
                placeholder="검색어를 입력하세요" 
                className="border border-gray-300 rounded px-4 py-2 w-full md:w-64 focus:outline-none focus:border-black transition-colors text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="bg-stone-900 text-white px-4 py-2 rounded hover:bg-stone-700 transition-colors whitespace-nowrap text-sm font-medium">
                검색
            </button>
        </div>
      </div>

      {/* List (Table for Desktop) */}
      <div className="hidden md:block w-full overflow-x-auto font-sans">
        <table className="w-full table-fixed">
            <thead className="bg-stone-50 border-b border-stone-300">
                <tr>
                    <th className="py-3 px-4 text-center font-medium text-stone-600 w-16">No.</th>
                    <th className="py-3 px-4 text-center font-medium text-stone-600">제목</th>
                    <th className="py-3 px-4 text-center font-medium text-stone-600 w-32">작성자</th>
                    <th className="py-3 px-4 text-center font-medium text-stone-600 w-32">작성일</th>
                    <th className="py-3 px-4 text-center font-medium text-stone-600 w-20">조회</th>
                </tr>
            </thead>
            <tbody>
                {mockPosts.map((post) => (
                    <tr key={post.id} className="border-b border-gray-100 hover:bg-stone-50 transition-colors">
                        <td className="py-4 px-4 text-center text-gray-500 text-sm">{post.id}</td>
                        <td className="py-4 px-4 text-left font-medium cursor-pointer hover:underline text-stone-800 truncate">
                            {post.title}
                        </td>
                        <td className="py-4 px-4 text-center text-gray-600 text-sm truncate">{post.author}</td>
                        <td className="py-4 px-4 text-center text-gray-500 text-xs">{post.date}</td>
                        <td className="py-4 px-4 text-center text-gray-500 text-xs">{post.views}</td>
                    </tr>
                ))}
            </tbody>
        </table>
        
        {mockPosts.length === 0 && (
            <div className="py-20 text-center text-gray-500">게시글이 없습니다.</div>
        )}
      </div>

      {/* List (Cards for Mobile) */}
      <div className="md:hidden flex flex-col gap-3 font-sans">
          {mockPosts.map((post) => (
              <div key={post.id} className="bg-white p-4 border border-stone-200 rounded-lg shadow-sm active:scale-[0.99] transition-transform cursor-pointer">
                  <div className="flex justify-between items-center mb-2">
                      <span className="text-xs px-2 py-0.5 bg-stone-100 text-stone-500 rounded-full">No. {post.id}</span>
                      <span className="text-xs text-stone-400">{post.date}</span>
                  </div>
                  <h3 className="text-base font-bold text-stone-800 mb-3 line-clamp-2">{post.title}</h3>
                  <div className="flex justify-between items-end border-t border-stone-100 pt-3">
                      <span className="text-sm text-stone-600 font-medium">{post.author}</span>
                      <span className="text-xs text-stone-400">조회 {post.views}</span>
                  </div>
              </div>
          ))}
      </div>

      {/* Footer Controls */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-8 gap-4 font-sans">
          {/* Empty div for layout balance on desktop if needed, or removing for simple flex-between */}
          
          {/* Pagination */}
          <div className="flex gap-1">
             <button className="w-8 h-8 flex items-center justify-center border border-stone-300 rounded text-stone-500 hover:bg-stone-100 hover:text-black transition-colors disabled:opacity-50 text-sm">&lt;</button>
             <button className="w-8 h-8 flex items-center justify-center bg-stone-900 text-white rounded font-bold text-sm">1</button>
             <button className="w-8 h-8 flex items-center justify-center border border-stone-300 rounded text-stone-500 hover:bg-stone-100 hover:text-black transition-colors text-sm">2</button>
             <button className="w-8 h-8 flex items-center justify-center border border-stone-300 rounded text-stone-500 hover:bg-stone-100 hover:text-black transition-colors text-sm">3</button>
             <button className="w-8 h-8 flex items-center justify-center border border-stone-300 rounded text-stone-500 hover:bg-stone-100 hover:text-black transition-colors text-sm">&gt;</button>
          </div>

          <button className="w-full md:w-auto bg-stone-900 text-white px-6 py-2 rounded hover:bg-stone-700 transition-colors font-medium text-sm shadow-lg shadow-stone-200">
              글쓰기
          </button>
      </div>
    </div>
  );
}