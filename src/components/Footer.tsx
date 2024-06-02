const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-gray-100 text-center text-gray-700 dark:bg-gray-100 left-0 right-0">
      <div className="container mx-auto">
        <div className="rounded-lg dark:border-gray-200 mt-6">
          <div className="bg-gray-100 p-2 text-center text-gray-500 dark:bg-gray-100 dark:text-gray-600">
            © 2024 Copyright:
            <a className="text-gray-500 dark:text-gray-400" href="#">
              &nbsp; Farmer Ordering System
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
