import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-center space-x-6">
            <Link href="/" legacyBehavior>
                    <a className="text-lg font-semibold hover:underline flex flex-grow">Anasayfa</a>
                </Link>
                <Link href="/completed" legacyBehavior>
                    <a className="text-lg font-semibold hover:underline">Tamamlanmış Görevler</a>
                </Link>
                <Link href="/incomplete" legacyBehavior>
                    <a className="text-lg font-semibold hover:underline">Tamamlanmamış Görevler</a>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
