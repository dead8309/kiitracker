import { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search } from 'lucide-react';

const DropdownButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // closing of the dropbox menu when you click elsewhere on the site...
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

// Array of objects (ALL THE SECTIONS OF KIIT (SOEE ADDING SOON...)) 
  const generateCourses = () => {
    const departments = [
      { prefix: 'CSE', count: 48 },
      { prefix: 'IT', count: 5 },
      { prefix: 'CSCE', count: 3 },
      { prefix: 'CSSE', count: 3 }
    ];

    const allCourses = [];
    
    departments.forEach(dept => {
      for (let i = 1; i <= dept.count; i++) {
        const courseNumber = String(i).padStart(2, '0');
        allCourses.push(`${dept.prefix}-${courseNumber}`);
      }
    });
    
    return allCourses;
  };

  const courses = generateCourses();

  const filteredCourses = courses.filter(course =>
    course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm('');
    }
  };

  const handleCourseSelect = (course: string) => {
    setSelectedCourse(course);
    console.log('Selected course:', course);
    setIsOpen(false);
    setSearchTerm('');
  };

  return (
    <div className="relative ml-3" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg border border-gray-600 transition-colors text-gray-200"
      >
        <span className="mr-2">{selectedCourse || 'Select Course'}</span>
        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg border border-gray-600 z-10">
          {/* Search Box */}
          <div className="p-3 border-b border-gray-600">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
            </div>
          </div>
          
          {/* Course List */}
          <div className="max-h-64 overflow-y-auto">
            {filteredCourses.length > 0 ? (
              <div className="py-1">
                {filteredCourses.map((course) => (
                  <button
                    key={course}
                    onClick={() => handleCourseSelect(course)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 transition-colors"
                  >
                    {course}
                  </button>
                ))}
              </div>
            ) : (
              <div className="px-4 py-3 text-sm text-gray-400">
                No courses found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;